import os, sys
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()
client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_ANON_KEY"))
res = client.auth.sign_in_with_password({"email": sys.argv[1], "password": sys.argv[2]})
print(res.session.access_token)