from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_auth_user
from app.deps import get_current_shop

router = APIRouter(tags=["me"])


@router.get("/me")
def me(auth: dict = Depends(get_auth_user), db: Session = Depends(get_db)):
    row = db.execute(
        text("""SELECT user_id, name, shop_name, shop_type, language
                FROM users WHERE auth_id = CAST(:a AS uuid)"""),
        {"a": auth["auth_id"]},
    ).mappings().first()
    return {"auth": auth, "profile": dict(row) if row else None}


class LanguageIn(BaseModel):
    language: str


@router.put("/me/language")
def set_language(body: LanguageIn,
                 shop: dict = Depends(get_current_shop),
                 db: Session = Depends(get_db)):
    if body.language not in ("en", "kn", "hi"):
        raise HTTPException(status_code=400, detail="Unsupported language")
    db.execute(text("UPDATE users SET language = :l WHERE user_id = :u"),
               {"l": body.language, "u": shop["user_id"]})
    db.commit()
    return {"language": body.language}