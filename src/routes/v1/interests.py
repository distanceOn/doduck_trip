from fastapi import APIRouter, HTTPException, Body
from starlette.responses import JSONResponse

from data.methods.interests import InterestRepository
from data.methods.spots import SpotRepository

router = APIRouter()


@router.post("/")
async def create_interest(
        name: str = Body(...),
        description: str = Body(None),
        photo_url: str = Body(None),
):
    try:
        interest = await InterestRepository.add_interest(name, description, photo_url)
        return JSONResponse(status_code=201,
                            content={"id": interest.id,
                                     "name": interest.name,
                                     "description": interest.description,
                                     "photo_url": interest.photo_url})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/spots/{spot_id}/{interest_id}")
async def add_interest_to_spot(
        spot_id: int,
        interest_id: int,
):
    success = await SpotRepository.add_interest_to_spot(spot_id, interest_id)
    if not success:
        raise HTTPException(status_code=404, detail="Spot or Interest not found")
    return {"message": "Interest added to the spot successfully"}
