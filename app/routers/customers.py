from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.deps import get_current_shop
from app.services.balance import get_customers_with_balance

router = APIRouter(prefix="/customers", tags=["customers"])


@router.get("/")
def list_customers(shop: dict = Depends(get_current_shop), db: Session = Depends(get_db)):
    return get_customers_with_balance(db, shop["user_id"])