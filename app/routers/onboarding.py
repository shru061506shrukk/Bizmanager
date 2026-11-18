from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_auth_user
from app.business_config import BUSINESS_TYPES

router = APIRouter(prefix="/onboarding", tags=["onboarding"])


class ProfileIn(BaseModel):
    owner_name: str = Field(min_length=2, max_length=80)
    shop_name: str = Field(min_length=2, max_length=100)
    business_type: str
    language: str = "en"
    phone: Optional[str] = Field(default=None, max_length=20)


@router.post("/profile")
def create_profile(body: ProfileIn,
                   auth: dict = Depends(get_auth_user),
                   db: Session = Depends(get_db)):
    if body.business_type not in BUSINESS_TYPES:
        raise HTTPException(status_code=400, detail="Unknown business type")
    if body.language not in ("en", "kn", "hi"):
        raise HTTPException(status_code=400, detail="Unsupported language")

    exists = db.execute(
        text("SELECT 1 FROM users WHERE auth_id = CAST(:a AS uuid)"),
        {"a": auth["auth_id"]},
    ).first()
    if exists:
        raise HTTPException(status_code=409, detail="Profile already exists")

    row = db.execute(
        text("""
            INSERT INTO users (name, shop_name, shop_type, language, phone, email, auth_id)
            VALUES (:name, :shop, :type, :lang, :phone, :email, CAST(:a AS uuid))
            RETURNING user_id, name, shop_name, shop_type, language
        """),
        {"name": body.owner_name, "shop": body.shop_name, "type": body.business_type,
         "lang": body.language, "phone": body.phone, "email": auth["email"],
         "a": auth["auth_id"]},
    ).mappings().first()
    db.commit()
    return {"profile": dict(row)}