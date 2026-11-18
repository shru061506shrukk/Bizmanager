import os
from dotenv import load_dotenv

load_dotenv()  # reads .env into environment variables

DATABASE_URL = os.getenv("DATABASE_URL")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")
APP_ENV = os.getenv("APP_ENV", "development")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is missing. Check your .env file.")

if not SUPABASE_URL:
    raise RuntimeError("SUPABASE_URL is missing. Check your .env file.")