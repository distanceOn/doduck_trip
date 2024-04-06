from fastapi import APIRouter, HTTPException, Body
from starlette.responses import JSONResponse

from data.methods.users import UserRepository
from data.models import AsyncSessionLocal

router = APIRouter()


@router.put("/{user_id}")
async def update_user_endpoint(user_id: int, user_update: dict = Body(...)):
    try:
        await UserRepository.update_user(user_id, **user_update)
        return JSONResponse(status_code=200, content={"message": "User updated successfully"})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/all")
async def get_all_users_endpoint():
    try:
        users = await UserRepository.get_all()
        return JSONResponse(status_code=200, content=[user.to_dict() for user in users])
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{user_id}")
async def get_user_endpoint(user_id: int):
    try:
        user = await UserRepository.get_by_id(user_id)
        if user:
            return user.to_dict()
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
