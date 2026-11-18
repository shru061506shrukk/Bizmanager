from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.deps import get_current_shop
from app.services.dashboard import build_dashboard

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/")
def dashboard(shop: dict = Depends(get_current_shop), db: Session = Depends(get_db)):
    return build_dashboard(db, shop)