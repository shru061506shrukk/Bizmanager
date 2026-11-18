from fastapi import APIRouter, HTTPException
from app.business_config import BUSINESS_TYPES

router = APIRouter(prefix="/business-types", tags=["onboarding"])


@router.get("/")
def list_business_types():
    return [{"key": k, **v} for k, v in BUSINESS_TYPES.items()]


@router.get("/{key}")
def get_business_type(key: str):
    if key not in BUSINESS_TYPES:
        raise HTTPException(status_code=404, detail="Unknown business type")
    return {"key": key, **BUSINESS_TYPES[key]}