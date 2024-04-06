from sqlalchemy import update, delete, and_
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload

from data.models import AsyncSessionLocal, Spot, Interest, spot_interest_association, SpotService


class SpotRepository:
    @staticmethod
    async def add_spot(name: str, latitude: float, longitude: float, type: str, description: str = None,
                       rating: float = 0.0) -> Spot:
        """
        Добавляет новое место в базу данных и опционально список фотографий.
        """
        async with AsyncSessionLocal() as session:
            try:
                new_spot = Spot(
                    name=name,
                    description=description,
                    latitude=latitude,
                    longitude=longitude,
                    type=type,
                    rating=rating
                )
                session.add(new_spot)
                await session.commit()
                await session.refresh(new_spot)

                return new_spot
            except SQLAlchemyError as e:
                await session.rollback()
                raise e

    @staticmethod
    async def get_spot_by_id(spot_id: int) -> Spot:
        """
        Возвращает место по его ID.
        """
        async with AsyncSessionLocal() as session:
            try:
                result = await session.execute(
                    select(Spot).options(
                        joinedload(Spot.photos),
                        joinedload(Spot.interests),
                        joinedload(Spot.services).joinedload(SpotService.standard_service)  # Загрузка standard_service
                    ).where(Spot.id == spot_id))
                spot = result.scalars().first()
                return spot
            except SQLAlchemyError as e:
                raise e

    @staticmethod
    async def update_spot(spot_id: int, **kwargs) -> None:
        """
        Обновляет информацию о месте.
        """
        async with AsyncSessionLocal() as session:
            try:
                await session.execute(update(Spot).where(Spot.id == spot_id).values(**kwargs))
                await session.commit()
            except SQLAlchemyError as e:
                await session.rollback()
                raise e

    @staticmethod
    async def delete_spot(spot_id: int) -> None:
        """
        Удаляет место из базы данных.
        """
        async with AsyncSessionLocal() as session:
            try:
                await session.execute(delete(Spot).where(Spot.id == spot_id))
                await session.commit()
            except SQLAlchemyError as e:
                await session.rollback()
                raise e

    @staticmethod
    async def list_spots() -> list:
        """
        Возвращает список всех мест вместе с фотографиями, интересами и сервисами.
        """
        async with AsyncSessionLocal() as session:
            try:
                result = await session.execute(
                    select(Spot)
                    .options(
                        joinedload(Spot.photos),
                        joinedload(Spot.interests),
                        joinedload(Spot.services).joinedload(SpotService.standard_service)  # Загрузка standard_service
                    )
                )
                spots = result.scalars().unique().all()
                return spots
            except SQLAlchemyError as e:
                raise e

    @staticmethod
    async def add_interest_to_spot(spot_id: int, interest_id: int) -> bool:
        async with AsyncSessionLocal() as session:
            try:
                # Проверяем существование спота
                spot = await session.get(Spot, spot_id)
                if not spot:
                    print(f"No spot found with id {spot_id}")
                    return False

                # Проверяем существование удобства
                interest = await session.get(Interest, interest_id)
                if not interest:
                    print(f"No interest found with id {interest_id}")
                    return False

                # Проверяем существование связи между спотом и удобством
                existing_association = await session.execute(
                    select(spot_interest_association).
                    where(and_(spot_interest_association.c.spot_id == spot_id,
                               spot_interest_association.c.interest_id == interest_id))
                )
                if existing_association.scalars().first():
                    print("The association between the spot and the interest already exists.")
                    return True  # Возвращаем True, поскольку цель (связь) уже достигнута

                # Добавляем новую связь между спотом и удобством
                await session.execute(
                    spot_interest_association.insert().values(spot_id=spot_id, interest_id=interest_id)
                )
                await session.commit()
                return True
            except SQLAlchemyError as e:
                await session.rollback()
                print(f"Error while adding interest to spot: {e}")
                return False
