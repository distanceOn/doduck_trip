import shutil
import uuid

import httpx
from fastapi import APIRouter, HTTPException, Body, UploadFile, File
from starlette.responses import JSONResponse

from data.config import IMGBB_API_KEY
from data.methods.spots_photos import SpotPhotoRepository

router = APIRouter()


async def upload_image_to_imgbb(api_key: str, image: UploadFile):
    url = "https://api.imgbb.com/1/upload"
    files = {'image': (image.filename, image.file, image.content_type)}
    response = httpx.post(url, params={'key': api_key}, files=files)
    return response.json()


# @router.post("/")
# async def upload_photo(file: UploadFile = File(...)):
#     response = await upload_image_to_imgbb(IMGBB_API_KEY, file)
#     if response.get("success"):
#         return {
#             "url": response["data"]["url"],
#             "delete_url": response["data"]["delete_url"]
#         }
#     else:
#         raise HTTPException(status_code=500, detail="Не удалось загрузить изображение")


@router.post("/")
async def upload_photo_to_spot(
        spot_id: int,
        file: UploadFile = File(...),
):
    try:
        response = await upload_image_to_imgbb(IMGBB_API_KEY, file)
        if not response.get("success"):
            # {
            #     "url": response["data"]["url"],
            #     "delete_url": response["data"]["delete_url"]
            # }

            # Добавление информации о фото в базу данных
            raise HTTPException(status_code=500, detail="Не удалось загрузить изображение")

        photo_url = response["data"]["url"]
        photo = await SpotPhotoRepository.add_photo_to_spot(spot_id, photo_url)

        return JSONResponse(status_code=201,
                            content={"photo_id": photo.id, "spot_id": photo.spot_id, "photo_url": photo.photo_url})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# @router.post("/")
# async def upload_photo_to_spot(
#         spot_id: int,
#         file: UploadFile = File(...),
# ):
#     try:
#         # Генерация уникального имени файла
#         file_name = f"{uuid.uuid4()}_{file.filename}"
#         file_path = f"data/photos/{file_name}"
#
#         # Сохранение файла
#         with open(file_path, "wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)
#
#         # Формирование URL для доступа к файлу (пример)
#         photo_url = f"/data/photos/{file_name}"
#
#         # Добавление информации о фото в базу данных
#         photo = await SpotPhotoRepository.add_photo_to_spot(spot_id, photo_url)
#
#         return JSONResponse(status_code=201,
#                             content={"photo_id": photo.id, "spot_id": photo.spot_id, "photo_url": photo.photo_url})
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))
