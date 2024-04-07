from typing import List

from fastapi import APIRouter, Body
from sqlalchemy import insert
from starlette.responses import JSONResponse

from data.methods.routes import RouteRepository
from data.models import Route, AsyncSessionLocal, route_spot_association

router = APIRouter()


@router.post("/routes/")
async def create_route(
        name: str = Body(...),
        description: str = Body(None),
        starting_point: str = Body(None),
        ending_point: str = Body(None),
        distance: float = Body(None),
        estimated_time: float = Body(None),
        difficulty_level: str = Body(None),
        spot_ids: List[int] = Body(...),
):
    async with AsyncSessionLocal() as session:
        # Создаём и сохраняем маршрут
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

        return new_route


@router.get("/all")
async def get_all():
    routes = await RouteRepository.get_all()
    return JSONResponse(status_code=200, content=routes)  # noqa: E501 routes


@router.get("/{route_id}")
async def get_route(route_id: int):
    routes = await RouteRepository.get_route(route_id)
    return JSONResponse(status_code=200, content=routes)
