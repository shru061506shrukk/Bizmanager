from fastapi import Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_auth_user


def get_current_shop(auth: dict = Depends(get_auth_user),
                     db: Session = Depends(get_db)) -> dict:
    row = db.execute(
        text("""SELECT user_id, name, shop_name, shop_type, language
                FROM users WHERE auth_id = CAST(:a AS uuid)"""),
        {"a": auth["auth_id"]},
    ).mappings().first()
    if not row:
        raise HTTPException(status_code=403, detail="Please finish setting up your business")
    return dict(row)