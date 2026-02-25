from flask import Flask, request, jsonify
from flask_cors import CORS
from jose import jwt
import requests

app = Flask(__name__)
CORS(app)

AUTH0_DOMAIN = "dev-ss2qtfzv7kx40kuw.us.auth0.com"
API_AUDIENCE = "https://portfolio-api"

@app.route("/")
def home():
    return "Backend Running!"

@app.route("/protected")
def protected():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]

    try:
        jsonurl = requests.get(f"https://{AUTH0_DOMAIN}/.well-known/jwks.json")
        jwks = jsonurl.json()

        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}

        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }

        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=["RS256"],
            audience=API_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/"
        )

        return jsonify({"message": "Access granted!", "user": payload})

    except Exception as e:
        return jsonify({"error": str(e)}), 401


if __name__ == "__main__":
    app.run(port=5000, debug=True)