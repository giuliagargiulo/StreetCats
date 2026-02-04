from fastapi import APIRouter, Depends, Path, Body
from starlette import status
import json
from pydantic import APIRouter, BaseModel, Field
from database import pgsqldb, PGSQL_SCHEMA

class CatIn(BaseModel):
    title: str = Field(..., title="Title of the cat post", example="Orange Cat")
    description: str = Field(..., title="Description of the post", example="I found this cat near my house.")
    location: json = Field(..., title="Location where the cat was found", example={"latitude": 40.7128, "longitude": -74.0060}) 
    picture_url: str = Field(..., title="URL of the cat picture", example="http://example.com/cat.jpg")
    user_uu_id: str = Field(..., title="UUID of the user who created the post", example="660e8400-e29b-41d4-a716-446655440111")

    
class CatOut(CatIn):
    uu_id: str = Field(..., title="UUID of the cat post", example="550e8400-e29b-41d4-a716-446655440000")
    created_at: str = Field(..., title="Post creation timestamp", example="2024-01-01T12:00:00Z")
    
responses = {
    status.HTTP_400_BAD_REQUEST: {"description": "Invalid request"},
    status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
    status.HTTP_404_NOT_FOUND: {"description": "Resource not found"}
} 
   
router = APIRouter()

