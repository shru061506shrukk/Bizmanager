import jwt
from jwt import PyJWKClient
from fastapi import Header, HTTPException
from app.config import SUPABASE_URL

_jwks = PyJWKClient(f"{SUPABASE_URL.rstrip('/')}/auth/v1/.well-known/jwks.json")


def get_auth_user(authorization: str = Header(None)) -> dict:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Please log in")
    token = authorization.split(" ", 1)[1]
    try:
        key = _jwks.get_signing_key_from_jwt(token).key
        claims = jwt.decode(
            token, key,
            algorithms=["ES256", "RS256"],
            audience="authenticated",
        )
    except Exception:
        raise HTTPException(status_code=401, detail="Login expired, please log in again")
    return {"auth_id": claims["sub"], "email": claims.get("email")}