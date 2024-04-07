from typing import Any

from sqlalchemy import insert, select, Row, RowMapping
from sqlalchemy.exc import NoResultFound, SQLAlchemyError
from sqlalchemy.orm import selectinload

from data.models import Route, AsyncSessionLocal, route_spot_association


def serialize_spot_for_route(spot):
    """
    Сериализует данные спота для маршрута в словарь с координатами, адресом и идентификатором.
    """
    return {
        "id": spot.id,
        "coords": [spot.latitude, spot.longitude],
        "address": spot.name  # Используйте название спота как адрес, если у вас нет отдельного поля для адреса
    }


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
    async def get_route(route_id: int) -> dict:
        async with AsyncSessionLocal() as session:
            try:
                result = await session.execute(
                    select(Route).where(Route.id == route_id).options(selectinload(Route.waypoints))
                )
                route = result.scalars().first()
                if not route:
                    raise NoResultFound("Route not found")

                # Сериализация спотов для маршрута
                points = [serialize_spot_for_route(spot) for spot in route.waypoints]

                # Возвращение данных маршрута с сериализованными точками
                return {
                    "id": route.id,
                    "name": route.name,
                    "starting_point": route.starting_point,
                    "ending_point": route.ending_point,
                    "distance": route.distance,
                    "estimated_time": route.estimated_time,
                    "difficulty_level": route.difficulty_level,
                    "description": route.description,
                    "points": points
                }
            except SQLAlchemyError as e:
                await session.rollback()
                raise e

    @staticmethod
    async def get_all() -> list:
        async with AsyncSessionLocal() as session:
            try:
                result = await session.execute(
                    select(Route).options(selectinload(Route.waypoints))
                )
                routes = result.scalars().all()
                if not routes:
                    raise NoResultFound("Routes not found")

                # Сериализация всех маршрутов с точками
                all_routes_data = []
                for route in routes:
                    points = [serialize_spot_for_route(spot) for spot in route.waypoints]
                    all_routes_data.append({
                        "id": route.id,
                        "name": route.name,
                        "starting_point": route.starting_point,
                        "ending_point": route.ending_point,
                        "distance": route.distance,
                        "estimated_time": route.estimated_time,
                        "difficulty_level": route.difficulty_level,
                        "description": route.description,
                        "points": points
                    })
                return all_routes_data
            except SQLAlchemyError as e:
                await session.rollback()
                raise e
