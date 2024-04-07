from fastapi import APIRouter, Body, HTTPException
from starlette.responses import JSONResponse

from data.methods.spots import SpotRepository

router = APIRouter()


@router.post("/", status_code=201)
async def create_spot(
        name: str = Body(...),
        description: str = Body(None),
        latitude: float = Body(...),
        longitude: float = Body(...),
        type: str = Body(...),
        rating: float = Body(0.0),
):
    spot = await SpotRepository.add_spot(
        name=name,
        description=description,
        latitude=latitude,
        longitude=longitude,
        type=type,
        rating=rating
    )
    return JSONResponse(status_code=201, content={
        "id": spot.id,
        "name": spot.name,
        "description": spot.description,
        "longitude": spot.longitude,
        "latitude": spot.latitude,
        "type": spot.type,
        "photos": None,  # Предполагается, что у вас есть такой атрибут
        "interests": None,
        "rating": spot.rating
    })


@router.get("/all")
async def get_all_spots():
    spots = await SpotRepository.list_spots()
    if not spots:
        raise HTTPException(status_code=404, detail="Spots not found")
    return JSONResponse(status_code=200, content=[{"id": spot.id,
                                                   "name": spot.name,
                                                   "description": spot.description,
                                                   "latitude": spot.latitude,
                                                   "longitude": spot.longitude,
                                                   "type": spot.type,
                                                   "contact": spot.contact_phone,
                                                   "photos": [photo.photo_url for photo in spot.photos],
                                                   "interests": [
                                                       {"name": interest.name, "description": interest.description,
                                                        "photo": interest.photo_url}
                                                       for interest in spot.interests
                                                   ],
                                                   "services": [
                                                       {
                                                           "name": service.standard_service.name if not service.is_custom else service.custom_name,
                                                           "description": service.description if service.is_custom else service.standard_service.description,
                                                           "price": service.price,
                                                           "is_custom": service.is_custom
                                                       } for service in spot.services
                                                   ],
                                                   "rating": spot.rating
                                                   } for spot in spots])


@router.get("/{spot_id}")
async def get_spot(spot_id: int):
    spot = await SpotRepository.get_spot_by_id(spot_id)
    if not spot:
        raise HTTPException(status_code=404, detail="Spot not found")
    return JSONResponse(status_code=200, content={"id": spot.id,
                                                  "name": spot.name,
                                                  "description": spot.description,
                                                  "latitude": spot.latitude,
                                                  "longitude": spot.longitude,
                                                  "type": spot.type,
                                                  "contact": spot.contact_phone,
                                                  "photos": [photo.photo_url for photo in spot.photos],
                                                  "interests": [
                                                      {"name": interest.name, "description": interest.description,
                                                       "photo": interest.photo_url}
                                                      for interest in spot.interests
                                                  ],
                                                  "services": [
                                                      {
                                                          "name": service.standard_service.name if not service.is_custom else service.custom_name,
                                                          "description": service.description if service.is_custom else service.standard_service.description,
                                                          "price": service.price,
                                                          "is_custom": service.is_custom
                                                      } for service in spot.services
                                                  ],
                                                  "rating": spot.rating
                                                  })
