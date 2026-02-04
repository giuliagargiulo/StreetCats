from fastapi import FastAPI
from router.cat import cat as cat_router
from router.user import user as user_router
from router.comment import comment as comment_router
from router.auth import auth as auth_router

app = FastAPI(
    title = "StreetCats API",
    description = "API for managing street cats data",
)

app.include_router(cat_router, prefix="/cat", tags=["cat"])
app.include_router(user_router, prefix="/user", tags=["user"])
app.include_router(comment_router, prefix="/comment", tags=["comment"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
