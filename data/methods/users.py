import logging
from typing import Optional

from sqlalchemy.future import select
from sqlalchemy.exc import NoResultFound, SQLAlchemyError
from app.schemas.users import UserCreate, UserUpdate, UserInDB
from data.models import AsyncSessionLocal, User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
class UserRepository:
    @staticmethod
    async def get_by_user_id(user_id: int) -> Optional[UserInDB]:
        """
        Асинхронно извлекает пользователя по его идентификатору.
        """
        try:
            async with AsyncSessionLocal() as session:
                result = await session.execute(select(User).where(User.id == user_id))
                user = result.scalars().first()
                if user:
                    return UserInDB.from_orm(user)
        except SQLAlchemyError as e:
            logging.error(f"An error occurred while fetching user by id: {e}")
            return None

    @staticmethod
    async def add_user(user_data: UserCreate) -> Optional[UserInDB]:
        """
        Асинхронно добавляет нового пользователя в базу данных.
        """
        try:
            async with AsyncSessionLocal() as session:
                new_user = User(**user_data.dict())
                session.add(new_user)
                await session.commit()
                await session.refresh(new_user)
                return UserInDB.from_orm(new_user)
        except SQLAlchemyError as e:
            logging.error(f"An error occurred while adding a new user: {e}")
            return None

    @staticmethod
    async def update_user(user_id: int, update_data: UserUpdate) -> Optional[UserInDB]:
        """
        Асинхронно обновляет данные пользователя в базе данных.
        """
        try:
            async with AsyncSessionLocal() as session:
                result = await session.execute(select(User).where(User.id == user_id))
                user_to_update = result.scalars().first()
                if user_to_update:
                    update_data_dict = update_data.dict(exclude_unset=True)
                    for key, value in update_data_dict.items():
                        setattr(user_to_update, key, value)
                    await session.commit()
                    return UserInDB.from_orm(user_to_update)
            return None
        except SQLAlchemyError as e:
            logging.error(f"An error occurred while updating user: {e}")
            return None

    @staticmethod
    async def delete_user(user_id: int) -> bool:
        """
        Асинхронно удаляет пользователя по его идентификатору.
        """
        try:
            async with AsyncSessionLocal() as session:
                result = await session.execute(select(User).where(User.id == user_id))
                user_to_delete = result.scalars().first()
                if user_to_delete:
                    await session.delete(user_to_delete)
                    await session.commit()
                    return True
                return False
        except SQLAlchemyError as e:
            logging.error(f"An error occurred while deleting user: {e}")
            return False

    @staticmethod
    async def authenticate_user(credentials: HTTPBasicCredentials) -> Optional[UserSchema]:
        """
        Асинхронно аутентифицирует пользователя по его учетным данным.

        Параметры:
        - credentials (HTTPBasicCredentials): Учетные данные пользователя.

        Возвращает:
        - Optional[UserSchema]: Схема аутентифицированного пользователя или None.
        """
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(User).where(User.email == credentials.username))
            user = result.scalars().first()
            if user and pwd_context.verify(credentials.password, user.password):
                return UserSchema.from_orm(user)
        return None