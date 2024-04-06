from datetime import datetime, timedelta
from random import randint

import jwt
from fastapi import FastAPI, HTTPException, status, Request, Body, Depends
from fastapi.security import HTTPBasicCredentials, HTTPBasic
from itsdangerous.url_safe import URLSafeTimedSerializer as Serializer
from loguru import logger
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import Response, JSONResponse

from src.log import logging

from data.config import SECRET_KEY, ALGORITHM
from data.methods.users import UserRepository
from data.models import User

security = HTTPBasic()

# Создаем сериализатор для безопасного хранения данных в сессии
serializer = Serializer(SECRET_KEY)

users = {}

sessions = {}


def create_session(user_id: int):
    expire = datetime.now() + timedelta(days=1)  # Сессия истекает через 1 день
    to_encode = {"exp": expire, "user_id": user_id}
    session_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    sessions[session_token] = user_id
    logger.info(sessions)
    return session_token


def get_session_token(request: Request):
    session_token = request.cookies.get("session_token")
    if session_token is None or str(session_token) not in sessions:
        raise HTTPException(status_code=401, detail="Invalid session ID")
    return str(session_token)


async def get_authenticated_user_from_session_token(request: Request):
    session_token = request.cookies.get("session_token")
    logger.info(session_token)
    if session_token is None or str(session_token) not in sessions:
        raise HTTPException(
            status_code=401,
            detail="Invalid session ID",
        )

    user = await get_user_from_session(str(session_token))
    return user


# Use the valid session id to get the corresponding user from the users dictionary
async def get_user_from_session(session_token: str) -> User:
    """
    Использует session_token для получения user_id, а затем извлекает пользователя из базы данных
    с использованием UserRepository.
    """
    user_id = sessions.get(session_token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Session not found")

    user = await UserRepository.get_by_id(user_id)
    logger.debug(user)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


async def authenticate_user(credentials: HTTPBasicCredentials = Depends(security)):
    user = await UserRepository.get_by_username(credentials.username)
    if user is None or not user.verify_password(credentials.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return user
