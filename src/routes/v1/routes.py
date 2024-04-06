from typing import List

from fastapi import APIRouter, Body
from sqlalchemy import insert

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
