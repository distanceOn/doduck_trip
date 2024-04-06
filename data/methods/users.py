from fastapi import HTTPException
from sqlalchemy import update
from sqlalchemy.future import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import selectinload

from data.models import AsyncSessionLocal, User


class UserRepository:
    @staticmethod
    async def add_user(username: str, email: str, password: str, first_name: str = None, last_name: str = None,
                       city: str = None, role: str = 'user') -> User:
        """
        Добавляет нового пользователя в базу данных.
        """
        async with AsyncSessionLocal() as session:
            try:
                new_user = User(
                    username=username,
                    first_name=first_name,
                    last_name=last_name,
                    city=city,
                    email=email,
                    password=password,
                    role=role
                )
                session.add(new_user)
                await session.commit()
                return new_user
            except SQLAlchemyError as e:
                await session.rollback()
                raise e

    @staticmethod
    async def get_by_id(user_id: int) -> User:
        """
        Возвращает пользователя по его ID.
        """
        async with AsyncSessionLocal() as session:
            try:
                result = await session.execute(select(User).where(User.id == user_id))
                user = result.scalars().first()
                return user
            except SQLAlchemyError as e:
                raise e

    @staticmethod
    async def get_by_email(email: str) -> User:
        """
        Возвращает пользователя по электронной почте.
        """
        async with AsyncSessionLocal() as session:
            try:
                result = await session.execute(select(User).where(User.email == email))
                user = result.scalars().first()
                return user
            except SQLAlchemyError as e:
                raise e

    @staticmethod
    async def update_user(user_id: int, **kwargs) -> User:
        """
        Обновляет информацию пользователя.
        """
        async with AsyncSessionLocal() as session:
            try:
                await session.execute(
                    update(User).where(User.id == user_id).values(**kwargs)
                )
                await session.commit()
            except SQLAlchemyError as e:
                await session.rollback()
                raise e

    @staticmethod
    async def get_by_username(username: str) -> User:
        """
        Асинхронно извлекает пользователя по его имени пользователя из базы данных.
        """
        async with AsyncSessionLocal() as session:
            try:
                result = await session.execute(select(User).filter(User.username == username))
                user = result.scalars().first()
                return user
            except SQLAlchemyError as e:
                await session.rollback()
                raise e

    @staticmethod
    async def get_all():
        async with AsyncSessionLocal() as session:
            try:
                result = await session.execute(select(User))
                users = result.scalars().all()
                return [user.to_dict() for user in users]
            except SQLAlchemyError as e:
                raise HTTPException(status_code=400, detail=str(e))
