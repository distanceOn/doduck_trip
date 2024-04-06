from typing import List

from fastapi import APIRouter, HTTPException, Depends, Body

from data.methods.services import ServiceRepository
from data.models import SpotService

router = APIRouter()


@router.post("/")
async def add_service(spot_id: int, service_data: dict = Body(...)):
    try:
        service = await ServiceRepository.add_service_to_spot(spot_id, service_data)
        return service
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/")
async def get_services(spot_id: int):
    try:
        services = await ServiceRepository.get_services_by_spot(spot_id)
        return services
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
