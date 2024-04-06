from typing import Any

from sqlalchemy import insert, select, Row, RowMapping
from sqlalchemy.exc import NoResultFound, SQLAlchemyError
from sqlalchemy.orm import selectinload

from data.models import Route, AsyncSessionLocal, route_spot_association


class RouteRepository:
    @staticmethod
    async def create_route(name: str, description: str, starting_point: str, ending_point: str,
                           distance: float, estimated_time: float, difficulty_level: str, spot_ids: list) -> Route:
        async with AsyncSessionLocal() as session:
            try:
                new_route = Route(
                    name=name,
                    description=description,
                    starting_point=starting_point,
                    ending_point=ending_point,
                    distance=distance,
                    estimated_time=estimated_time,
                    difficulty_level=difficulty_level
                )
                session.add(new_route)
                await session.commit()
                await session.refresh(new_route)

                # Привязываем споты к маршруту
                for spot_id in spot_ids:
                    await session.execute(
                        insert(route_spot_association).values(route_id=new_route.id, spot_id=spot_id)
                    )
                await session.commit()
            except SQLAlchemyError as e:
                await session.rollback()
                raise e
        return new_route

    @staticmethod
    async def get_route(route_id: int) -> Row[Any] | RowMapping:
        async with AsyncSessionLocal() as session:
            try:
                result = await session.execute(
                    select(Route).where(Route.id == route_id).options(selectinload(Route.waypoints))
                )
                route = result.scalars().first()
                if not route:
                    raise NoResultFound("Route not found")
            except SQLAlchemyError as e:
                await session.rollback()
                raise e
        return route
