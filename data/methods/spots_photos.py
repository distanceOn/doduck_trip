from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError

from data.models import SpotPhoto, Spot, AsyncSessionLocal


class SpotPhotoRepository:
    @staticmethod
    async def add_photo_to_spot(spot_id: int, photo_url: str) -> SpotPhoto:
        """
        Добавляет фотографию к споту.
        """
        try:
            async with AsyncSessionLocal() as session:
                spot = await session.execute(select(Spot).where(Spot.id == spot_id))
                if spot.scalar() is None:
                    raise SQLAlchemyError
                new_photo = SpotPhoto(spot_id=spot_id, photo_url=photo_url)
                session.add(new_photo)
                await session.commit()
                await session.refresh(new_photo)
                return new_photo
        except SQLAlchemyError as e:
            await session.rollback()
            raise e
