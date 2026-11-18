from sqlalchemy import text
from sqlalchemy.orm import Session
from app.business_config import BUSINESS_TYPES
from app.services.balance import get_customers_with_balance
from app.services.inventory import get_products


def build_dashboard(db: Session, shop: dict) -> dict:
    uid = shop["user_id"]
    biz = BUSINESS_TYPES.get(shop["shop_type"], BUSINESS_TYPES["other"])

    # Sales totals. "Today" uses Indian time, because the database clock is UTC.
    totals = db.execute(text("""
        WITH t AS (SELECT (NOW() AT TIME ZONE 'Asia/Kolkata')::date AS d)
        SELECT
          COALESCE(SUM(s.total_amount) FILTER (WHERE s.sale_date = t.d), 0)     AS today,
          COALESCE(SUM(s.total_amount) FILTER (WHERE s.sale_date > t.d - 30), 0) AS last_30,
          COUNT(*) FILTER (WHERE s.sale_date > t.d - 30)                         AS bills_30
        FROM t LEFT JOIN sales s ON s.user_id = :uid
        GROUP BY t.d
    """), {"uid": uid}).mappings().first()

    # Who owes money (already sorted, biggest first)
    customers = get_customers_with_balance(db, uid)
    owing = [c for c in customers if c["outstanding"] > 0]

    # Low stock, only for businesses that track stock
    low_stock = []
    if biz["uses_stock"]:
        low_stock = [p for p in get_products(db, uid) if p["low_stock"]]
        low_stock.sort(key=lambda p: float(p["stock_qty"]))

    # Sales per month, last 6 months with data
    months = db.execute(text("""
        SELECT to_char(date_trunc('month', sale_date), 'YYYY-MM') AS month,
               SUM(total_amount) AS total
        FROM sales WHERE user_id = :uid
        GROUP BY 1 ORDER BY 1 DESC LIMIT 6
    """), {"uid": uid}).mappings().all()
    monthly = [{"month": m["month"], "total": float(m["total"])} for m in reversed(months)]

    return {
        "shop": {"name": shop["name"], "shop_name": shop["shop_name"], "language": shop["language"]},
        "business": {"key": shop["shop_type"], "icon": biz["icon"],
                     "label": biz["label"], "uses_stock": biz["uses_stock"]},
        "today": float(totals["today"]),
        "last_30": float(totals["last_30"]),
        "bills_30": int(totals["bills_30"]),
        "total_outstanding": float(sum(c["outstanding"] for c in owing)),
        "customers_owing": len(owing),
        "top_owing": [{"name": c["name"], "outstanding": float(c["outstanding"])} for c in owing[:5]],
        "low_stock_count": len(low_stock),
        "low_stock": [{"name": p["name"],
                       "names": {"en": p["name"], "kn": p["name_kn"], "hi": p["name_hi"]},
                       "stock_qty": float(p["stock_qty"]),
                       "reorder_level": float(p["reorder_level"]), "unit": p["unit"]}
                      for p in low_stock[:8]],
        "monthly": monthly,
    }