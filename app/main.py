from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.config import SUPABASE_URL, SUPABASE_ANON_KEY
from app.database import get_db, test_connection
from app.routers import business_types, me, onboarding, customers, products, dashboard

app = FastAPI(
    title="BizManager AI",
    description="Multilingual Business Management System",
    version="1.0.0"
)

# ---- API routers ----
app.include_router(business_types.router)
app.include_router(me.router)
app.include_router(onboarding.router)
app.include_router(customers.router)
app.include_router(products.router)
app.include_router(dashboard.router)


@app.get("/", include_in_schema=False)
def home():
    return RedirectResponse(url="/ui/")


# Only the public URL and anon key. NEVER add DATABASE_URL or any secret here.
@app.get("/public-config")
def public_config():
    return {
        "supabase_url": SUPABASE_URL,
        "supabase_anon_key": SUPABASE_ANON_KEY,
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/health/db")
def health_db(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT COUNT(*) FROM customers")).scalar()
        return {"database": "connected", "customers": result}
    except Exception:
        raise HTTPException(status_code=500, detail="Database connection or query failed")


@app.get("/health/postgres")
def postgres_health():
    try:
        test_connection()
        return {"database": "connected", "status": "success"}
    except Exception:
        raise HTTPException(status_code=500, detail="Database connection failed")


# Frontend: must stay at the very bottom
app.mount("/ui", StaticFiles(directory="frontend", html=True), name="ui")