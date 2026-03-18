from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt
import requests

app = FastAPI()

# Allow React frontend
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AUTH0_DOMAIN = "dev-ss2qtfzv7kx40kuw.us.auth0.com"
ALGORITHMS = ["RS256"]

JWKS_URL = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"

jwks = requests.get(JWKS_URL).json()

@app.get("/api/data")
async def get_secure_data(request: Request):

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    token = auth_header.split(" ")[1]

    try:
        # Decode token without verification for demo
        payload = jwt.get_unverified_claims(token)

        user_id = payload["sub"]

        return {
            "message": "Secure data accessed 🚀",
            "user_id": user_id
        }

    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")