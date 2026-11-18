from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.deps import get_current_shop
from app.services.inventory import get_products

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/")
def list_products(shop: dict = Depends(get_current_shop), db: Session = Depends(get_db)):
    return get_products(db, shop["user_id"])