from fastapi import FastAPI
from api.router.cat.cat import router as cat_router
from api.router.user.user import router as user_router
from api.router.auth.auth import router as auth_router
from api.router.comment.comment import router as comment_router
from fastapi.middleware.cors import CORSMiddleware
from api.database import database 
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title = "StreetCats API",
    description = "API for managing street cats data",
)
app.include_router(cat_router, prefix="/cat", tags=["cat"])
app.include_router(user_router, prefix="/user", tags=["user"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(comment_router, prefix="/comment", tags=["comment"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # per sviluppo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()