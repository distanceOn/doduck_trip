from fastapi import HTTPException, status, Body, Depends, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from starlette.responses import JSONResponse
from datetime import timedelta

from data.config import ACCESS_TOKEN_EXPIRE_MINUTES
from data.methods.users import UserRepository, pwd_context
from data.models import User
from src.routes.v1.utils import create_access_token, authenticate_user

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


class LoginForm(BaseModel):
    username: str
    password: str


@router.post("/login")
async def login(form_data: LoginForm = Body(...)):
    # Аутентификация пользователя
    user = await UserRepository.get_by_username(form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Создание токена доступа
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "user": user.to_dict()}


@router.post("/signup")
async def sign_up(email: str = Body(...), password: str = Body(...), username: str = Body(...)):
    user = await UserRepository.add_user(username=username, email=email, password=password)
    if not user:
        raise HTTPException(status_code=400, detail="Email or username is already registered")
    return JSONResponse(status_code=200, content={"message": "User successfully registered"})


@router.post("/logout")
async def logout():
    # JWT токен не требует логики выхода из системы на сервере, так как клиент должен просто удалить токен
    return JSONResponse(status_code=200, content={"message": "Successfully logged out"})
