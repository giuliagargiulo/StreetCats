from fastapi import APIRouter, Depends, Path, Body, status, HTTPException
from pydantic import BaseModel, Field
from api.database import get_db
from uuid import UUID
from datetime import datetime
from api.router.auth.auth_util import get_current_user

class Location(BaseModel):
    latitude: float = Field(..., example=40.8518)
    longitude: float = Field(..., example=14.2681)

class CatIn(BaseModel):
    title: str = Field(..., title="Title of the cat post", example="Orange Cat")
    description: str = Field(..., title="Description of the post", example="I found this cat near my house.")
    location: Location = Field(..., title="Location where the cat was found", example={"latitude": 40.7128, "longitude": -74.0060}) 
    picture_url: str = Field(..., title="URL of the cat picture", example="http://example.com/cat.jpg")
    user_uu_id: UUID = Field(..., title="UUID of the user who created the post", example="660e8400-e29b-41d4-a716-446655440111")

class CatOut(CatIn):
    uu_id: UUID = Field(..., title="UUID of the cat post", example="550e8400-e29b-41d4-a716-446655440000")
    created_at: datetime = Field(..., title="Creation date of the cat post", example="2025-02-22T14:30:00Z")
    
responses = {
    status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Internal server error"},
    status.HTTP_404_NOT_FOUND: {"description": "Resource not found"}
} 
   
router = APIRouter()

# ROUTES:
# POST{}: aggiungi un gatto (solo un utente loggato può)
# GET: tutti i gatti
# GET{/id}: cerca per id

@router.get("/by-id/{uu_id}",
            response_model=CatOut,
            responses = {**responses},
            status_code=status.HTTP_200_OK,
            description = "Get cat by id")
async def get_cat_by_id(uu_id: UUID, pgdb = Depends(get_db)):
    query = ("SELECT uu_id::text, title, description, location, picture_url, user_uu_id, created_at "
             "FROM tbl_cat "
             "WHERE uu_id = :uu_id ")
    q_data = {"uu_id": uu_id}
    try:
        res = await pgdb.fetch_one(query=query, values=q_data)
        if not res:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Cat not found")
        return res
    except HTTPException:
        raise
    except Exception as ex:
        print(f"ERROR: {ex}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Internal server error")
    
@router.get("/all",
            response_model= list[CatOut],
            responses = {**responses},
            status_code=status.HTTP_200_OK,
            description = "Get all the cats")
async def get_all_cats(pgdb = Depends(get_db)):
    query = ("SELECT uu_id::text, title, description, location, picture_url, user_uu_id, created_at "
             "FROM tbl_cat ")
    try:
        res = await pgdb.fetch_all(query=query)
        # if not res:
        #     raise HTTPException(
        #         status_code=status.HTTP_404_NOT_FOUND, detail="There are not cats")
        # return res
        return res if res else []
    except HTTPException:
        raise
    except Exception as ex:
        print(f"ERROR: {ex}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Internal server error")
        
@router.post("/new-cat",
             response_model=CatOut,
             status_code=status.HTTP_201_CREATED,
             description = "A logged user add a new cat on the platform")
async def create_cat(cat: CatIn, user_uu_id: UUID = Depends(get_current_user), pgdb = Depends(get_db)):
    query= ("INSERT INTO tbl_cat(title, description, location, picture_url, user_uu_id) "
            "VALUES (:title, :description, :location, :picture_url, :user_uu_id) "
            "RETURNING uu_id::text, title, description, location, picture_url, " 
            "user_uu_id, created_at ")
    q_data = cat.model_dump()
    q_data['user_uu_id'] = str(user_uu_id)
    try:
        res = await pgdb.fetch_one(query=query, values=q_data)
        return res
    except Exception as ex:
        print(f"ERROR: {ex}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Internal server error")
    
    