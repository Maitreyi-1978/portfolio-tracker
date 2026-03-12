from fastapi import FastAPI, Request, HTTPException
from jose import jwt
import requests

app = FastAPI()

AUTH0_DOMAIN = "dev-ss2qtfzv7kx40kuw.us.auth0.com"

JWKS_URL = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"

jwks = requests.get(JWKS_URL).json()

@app.get("/api/data")
async def get_secure_data(request: Request):

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    token = auth_header.split(" ")[1]

    try:
        payload = jwt.get_unverified_claims(token)

        user_id = payload["sub"]

        return {
            "message": "Secure data accessed",
            "user_id": user_id
        }

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")