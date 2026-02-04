from pydantic import APIRouter, BaseModel, Field
from starlette import status
from database import pgsqldb, PGSQL_SCHEMA
from datetime import datetime

class CommentIn(BaseModel):
    content: str = Field(..., title="Content of the comment", example="I saw this cat near my office.")
    cat_uu_id: str = Field(..., title="UUID of the cat post", example="550e8400-e29b-41d4-a716-446655440000")
    user_uu_id: str = Field(..., title="UUID of the user who made the comment", example="660e8400-e29b-41d4-a716-446655440111")
    
class CommentOut(CommentIn):
    uu_id: str = Field(..., title="UUID of the comment", example="770e8400-e29b-41d4-a716-446655440222")
    created_at: datetime = Field(..., title="Comment creation timestamp", example="2024-01-02T15:30:00Z")
    
    
responses = {
    status.HTTP_400_BAD_REQUEST: {"description": "Invalid request"},
    status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
    status.HTTP_404_NOT_FOUND: {"description": "Resource not found"}
}

router = APIRouter()
