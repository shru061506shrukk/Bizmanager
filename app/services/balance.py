from sqlalchemy import text
from sqlalchemy.orm import Session


def get_customers_with_balance(db: Session, user_id: int):
    sql = text("""
        SELECT c.customer_id, c.name, c.phone, c.village_or_area,
               COALESCE(s.billed, 0) - COALESCE(p.paid, 0) AS outstanding
        FROM customers c
        LEFT JOIN (SELECT customer_id, SUM(total_amount) AS billed
                   FROM sales
                   GROUP BY customer_id) s ON s.customer_id = c.customer_id
        LEFT JOIN (SELECT s.customer_id, SUM(p.amount) AS paid
                   FROM payments p
                   JOIN sales s ON s.sale_id = p.sale_id
                   GROUP BY s.customer_id) p ON p.customer_id = c.customer_id
        WHERE c.user_id = :uid
        ORDER BY outstanding DESC
    """)
    rows = db.execute(sql, {"uid": user_id}).mappings().all()
    return [dict(r) for r in rows]