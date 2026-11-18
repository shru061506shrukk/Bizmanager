
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.config import DATABASE_URL

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=5
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def test_connection():
    with engine.connect() as connection:
        return connection.execute(
            text("SELECT 1")
        ).scalar()
