from sqlalchemy import text
from sqlalchemy.orm import Session


def get_products(db: Session, user_id: int):
    sql = text("""
        SELECT product_id, name, name_kn, name_hi, category, unit, price,
               stock_qty, reorder_level,
               COALESCE(stock_qty <= reorder_level, FALSE) AS low_stock
        FROM products
        WHERE user_id = :uid
        ORDER BY category, name
    """)
    return [dict(r) for r in db.execute(sql, {"uid": user_id}).mappings().all()]