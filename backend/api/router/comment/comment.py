from fastapi import APIRouter, status, Depends, HTTPException
from pydantic import BaseModel, Field
from api.database import pgdb
from datetime import datetime
from api.router.auth.auth_util import get_current_user
from uuid import UUID


class CommentIn(BaseModel):
    content: str = Field(..., title="Content of the comment", example="I saw this cat near my office.")
    cat_uu_id: UUID = Field(..., title="UUID of the cat post", example="550e8400-e29b-41d4-a716-446655440000")
    
class CommentOut(CommentIn):
    uu_id: UUID = Field(..., title="UUID of the comment", example="770e8400-e29b-41d4-a716-446655440222")    
    created_at: datetime = Field(..., title="Creation date of the comment", example="2025-02-22T14:30:00Z")

responses = {
    status.HTTP_400_BAD_REQUEST: {"description": "Invalid request"},
    status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
    status.HTTP_404_NOT_FOUND: {"description": "Resource not found"}
}

router = APIRouter()

# ROUTES
# POST{}: add a comment (solo un utente loggato può)
# GET: get comment by cat

@router.get("/by-cat/{cat_uu_id}",
            response_model= list[CommentOut],
            responses = {**responses},
            status_code=status.HTTP_200_OK,
            description = "Get all comments of a cat post in descending order of creation")
async def get_comments_by_cat(cat_uu_id: UUID):
    query = ("SELECT uu_id::text, content, cat_uu_id::text, user_uu_id::text, created_at "
             "FROM tbl_comment "
             "WHERE cat_uu_id = :cat_uu_id "
             "ORDER BY created_at DESC")
    q_data = {"cat_uu_id": cat_uu_id}
    try:
        res = await pgdb.fetch_all(query=query, values=q_data)
        return res
    except Exception as ex:
        print(f"ERROR: {ex}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Internal server error")


@router.post("/new-comment",
            response_model=CommentOut,
            status_code=status.HTTP_201_CREATED,
            description = "A logged user add a new comment to a cat post")
async def create_comment(comment: CommentIn, user_uu_id: UUID = Depends(get_current_user)):
    query= ("INSERT INTO tbl_comment(content, cat_uu_id, user_uu_id) "
            "VALUES (:content, :cat_uu_id, :user_uu_id) "
            "RETURNING uu_id::text, content, cat_uu_id::text, user_uu_id::text, created_at ")
    q_data = comment.model_dump()
    q_data['user_uu_id'] = str(user_uu_id)
    try:
        res = await pgdb.fetch_one(query=query, values=q_data)
        return res
    except Exception as ex:
        print(f"ERROR: {ex}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Internal server error")
            

