from datetime import datetime, timedelta
from random import randint

import jwt
from fastapi import FastAPI, HTTPException, status, Request, Body, Depends
from fastapi.security import HTTPBasicCredentials, HTTPBasic
from itsdangerous.url_safe import URLSafeTimedSerializer as Serializer
from loguru import logger
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import Response, JSONResponse

from src.routes.v1 import router as v1_router
from src.log import logging

from data.config import SECRET_KEY, ALGORITHM
from data.methods.users import UserRepository
from data.models import User

app = FastAPI(debug=True)
security = HTTPBasic()
credentials = Depends(security)

app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)
app.include_router(v1_router)

# Создаем сериализатор для безопасного хранения данных в сессии
serializer = Serializer(SECRET_KEY)


# Логгирование
@app.exception_handler(Exception)
async def exception_logger(request: Request, exc: Exception):
    logging.exception(f"Unhandled exception: {exc}")
    return JSONResponse("Internal server error", status_code=500)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logging.debug(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logging.debug(f"Response: {response.status_code}")
    return response
