from fastapi import FastAPI
from api.router.cat.cat import router as cat_router
from api.router.user.user import router as user_router
from api.router.comment.comment import router as comment_router
from api.router.auth.auth import router as auth_router

app = FastAPI(
    title = "StreetCats API",
    description = "API for managing street cats data",
)

app.include_router(cat_router, prefix="/cat", tags=["cat"])
app.include_router(user_router, prefix="/user", tags=["user"])
app.include_router(comment_router, prefix="/comment", tags=["comment"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
