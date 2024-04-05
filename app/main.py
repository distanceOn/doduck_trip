from datetime import datetime, timedelta
from random import randint

import jwt
from fastapi import FastAPI, HTTPException, status, Request, Body, Depends
from fastapi.security import HTTPBasicCredentials, HTTPBasic
from itsdangerous.url_safe import URLSafeTimedSerializer as Serializer
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import Response

from app.log import logging
from data.config import SECRET_KEY, ALGORITHM

app = FastAPI(debug=True)
security = HTTPBasic()
credentials = Depends(security)

app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

# Создаем сериализатор для безопасного хранения данных в сессии
serializer = Serializer(SECRET_KEY)

users = {}

sessions = {}


def create_session(user_id: int):
    expire = datetime.now() + timedelta(days=1)  # Сессия истекает через 1 день
    to_encode = {"exp": expire, "user_id": user_id}
    session_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    sessions[session_token] = user_id
    return session_token


def get_session_token(request: Request):
    session_token = request.cookies.get("session_token")
    if session_token is None or str(session_token) not in sessions:
        raise HTTPException(status_code=401, detail="Invalid session ID")
    return str(session_token)


def get_authenticated_user_from_session_token(request: Request):
    session_token = request.cookies.get("session_token")
    if session_token is None or str(session_token) not in sessions:
        raise HTTPException(
            status_code=401,
            detail="Invalid session ID",
        )

    user = get_user_from_session(str(session_token))
    return user


# Use the valid session id to get the corresponding user from the users dictionary
def get_user_from_session(session_token: str):
    user = None
    for user_data in users.values():
        if user_data['user_id'] == sessions.get(session_token):
            user = user_data
            break

    return user


def authenticate_user(credentials: HTTPBasicCredentials = Depends(security)):
    user = users.get(credentials.username)
    if user is None or user["password"] != credentials.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return user


@app.post("/login")
def login(response: Response, user: dict = Depends(authenticate_user)):
    session_token = create_session(user["user_id"])
    # Установка кука
    response.set_cookie(key="session_token", value=str(session_token), httponly=True, secure=True)
    return {"message": "Logged in successfully", "session_token": session_token}


# @app.get("/getusers/me")
# def read_current_user(user: dict = Depends(get_user_from_session_token)):
#     return user


@app.get("/protected")
def protected_endpoint(user: dict = Depends(get_authenticated_user_from_session_token)):
    if user is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authenticated")
    return {"message": "This user can connect to a protected endpoint after successfully authenticated", "user": user}


@app.get("/")
async def root(request: Request):
    user_in_session = request.session.get('user')
    if user_in_session:
        user = serializer.loads(user_in_session)
        return {"message": f"Hello {user['username']}"}
    return {"message": "Hello World"}


@app.post("/signup")
def sign_up(username: str = Body(...), password: str = Body(...)):
    user = users.get(username)
    if user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already exists",
        )
    new_user_id = len(users) + 1
    new_user = {
        "username": username,
        "password": password,
        "user_id": new_user_id
    }
    users[username] = new_user
    return {"message": "User registered successfully"}


@app.post("/logout")
def logout(response: Response, session_token: str = Depends(get_session_token)):
    if session_token not in sessions:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
    sessions.pop(session_token)
    # Удаление кука
    response.delete_cookie("session_token")
    return {"message": "Logged out successfully", "session_token": session_token}


# Логгирование
@app.exception_handler(Exception)
async def exception_logger(request: Request, exc: Exception):
    logging.exception(f"Unhandled exception: {exc}")
    return Response("Internal server error", status_code=500)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logging.debug(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logging.debug(f"Response: {response.status_code}")
    return response
