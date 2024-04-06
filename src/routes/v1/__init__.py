from fastapi import APIRouter

from .auth import router as auth_router
from .routes import router as routes_router
from .spots import router as spots_router
from .spots_photos import router as spots_photos_router
from .interests import router as interests_router
from .services import router as services_router
from .users import router as users_router

router = APIRouter(prefix="/api/v1", tags=["V1"])

router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(routes_router, prefix="/routes", tags=["routes"])
router.include_router(spots_router, prefix="/spots", tags=["spots"])
router.include_router(spots_photos_router, prefix="/spots/{spot_id}/photos", tags=["photos"])
router.include_router(services_router, prefix="/spots/{spot_id}/services", tags=["services"])
router.include_router(interests_router, prefix="/interest", tags=["interests"])
router.include_router(users_router, prefix="/users", tags=["users"])
