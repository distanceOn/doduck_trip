from sqlalchemy.exc import SQLAlchemyError

from ..models import AsyncSessionLocal, Interest


class InterestRepository:
    @staticmethod
    async def add_interest(name: str, description: str = None, photo_url: str = None) -> Interest:
        """
        Добавляет новое удобство в базу данных.
        """
        async with AsyncSessionLocal() as session:
            try:
                new_interest = Interest(name=name,
                                        description=description,
                                        photo_url=photo_url)
                session.add(new_interest)
                await session.commit()
                return new_interest
            except SQLAlchemyError as e:
                await session.rollback()
                raise e
