from typing import List

from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import selectinload

from data.models import AsyncSessionLocal, SpotService


class ServiceRepository:
    @staticmethod
    async def add_service_to_spot(spot_id: int, service_data: dict) -> SpotService:
        async with AsyncSessionLocal() as session:
            try:
                new_service = SpotService(**service_data, spot_id=spot_id)
                session.add(new_service)
                await session.commit()
                return new_service
            except SQLAlchemyError as e:
                await session.rollback()
                raise e

    @staticmethod
    async def get_services_by_spot(spot_id: int) -> List[SpotService]:
        async with AsyncSessionLocal() as session:
            result = await session.execute(
                select(SpotService).where(SpotService.spot_id == spot_id).options(
                    selectinload(SpotService.standard_service))
            )
            services = result.scalars().all()
            return services
