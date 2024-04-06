from fastapi import HTTPException, status, Request, Body, Depends, APIRouter
from fastapi.security import HTTPBasicCredentials
from starlette.responses import Response, JSONResponse

from src.routes.v1.utils import security, create_session, get_authenticated_user_from_session_token, serializer, \
    sessions, get_session_token
from data.methods.users import UserRepository
from data.models import User

router = APIRouter()


@router.post("/login")
async def login(response: Response, credentials: HTTPBasicCredentials = Depends(security)):
    user = await UserRepository.get_by_email(credentials.username)
    if not user or user.password != credentials.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    # Создаем сессию для пользователя
    session_token = create_session(user.id)
    response.set_cookie(key="session_token", value=session_token, httponly=True, secure=True)
    return JSONResponse(content={"message": "Logged in successfully", "session_token": session_token}, status_code=200)


@router.get("/protected")
async def protected_endpoint(user: User = Depends(get_authenticated_user_from_session_token)):
    if user is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authenticated")
    return JSONResponse(content={
        "message": "This user can connect to a protected endpoint after successfully authenticated",
        "user": user.to_dict()}, status_code=200)


@router.post("/signup")
async def sign_up(response: Response, email: str = Body(...), password: str = Body(...), username: str = Body(...)):
    try:
        # Проверка существования пользователя с таким email или username
        existing_email_user = await UserRepository.get_by_email(email)
        if existing_email_user:
            raise HTTPException(status_code=400, detail="Email is already registered")

        # Также стоит рассмотреть проверку на уникальность username

        # Создание нового пользователя с обязательными параметрами
        user = await UserRepository.add_user(email=email, password=password, username=username)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Создаем сессию для нового пользователя
    session_token = create_session(user.id)
    response.set_cookie(key="session_token", value=session_token, httponly=True, secure=True)
    return JSONResponse(status_code=200,
                        content={"message": "User registered and logged in successfully",
                                 "session_token": session_token})


@router.post("/logout")
async def logout(response: Response, session_token: str = Depends(get_session_token)):
    if session_token not in sessions:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
    sessions.pop(session_token)
    # Удаление куки
    response.delete_cookie("session_token")
    return JSONResponse(status_code=200, content={"message": "Logged out successfully", "session_token": session_token})
