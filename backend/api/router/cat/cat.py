from fastapi import APIRouter, Depends, UploadFile, status, HTTPException, File, Form, Request
from pydantic import BaseModel, Field
from api.database import get_db
from databases import Database
from uuid import UUID
from datetime import datetime
from api.router.auth.auth_util import get_current_user
from pathlib import Path as FileSystemPath
import uuid

UPLOAD_DIR = FileSystemPath("uploads/cats")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

class CatIn(BaseModel):
    title: str = Field(..., title="Title of the cat post",
                       example="Orange Cat")
    description: str = Field(..., title="Description of the post",
                             example="I found this cat near my house.")
    latitude: float = Field(..., title="latitude where the cat was found", 
                        example=40.8518)
    longitude: float = Field(..., title="longitude where the cat was found",
                        example=14.2681)
    picture_url: str = Field(..., title="Relative URL of the cat picture",
                             example="uploads/cat/cat.jpg")
    user_uu_id: UUID = Field(..., title="UUID of the user who created the post",
                             example="660e8400-e29b-41d4-a716-446655440111")


class CatOut(CatIn):
    uu_id: UUID = Field(..., title="UUID of the cat post",
                        example="550e8400-e29b-41d4-a716-446655440000")
    created_at: datetime = Field(..., title="Creation date of the cat post",
                                 example="2025-02-22T14:30:00Z")


responses = {
    status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Internal server error"},
    status.HTTP_404_NOT_FOUND: {"description": "Resource not found"}
}

router = APIRouter(
    dependencies=[Depends(get_db)]
    )

# ROUTES:
# POST{}: aggiungi un gatto (solo un utente loggato può)
# GET: tutti i gatti
# GET{/id}: cerca per id


@router.get("/by-id/{uu_id}",
            response_model=CatOut,
            responses={**responses},
            status_code=status.HTTP_200_OK,
            description="Get cat by id")
async def get_cat_by_id(uu_id: UUID, request: Request, pgdb: Database = Depends(get_db)):
    query = ("SELECT uu_id::text, title, description, longitude, latitude, picture_url, user_uu_id, created_at "
             "FROM tbl_cat "
             "WHERE uu_id = :uu_id ")
    q_data = {"uu_id": str(uu_id)}
    try:
        res = await pgdb.fetch_one(query=query, values=q_data)
        if not res:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Cat not found")
        
        base_url = str(request.base_url).rstrip("/")
        cat_dict = dict(res)
        
        if cat_dict["picture_url"] and not cat_dict["picture_url"].startswith("http"):
            clean_path = cat_dict["picture_url"].lstrip("/")
            cat_dict["picture_url"] = f"{base_url}/{clean_path}"
        return cat_dict

    except HTTPException:
        raise
    except Exception as ex:
        print(f"ERROR: {ex}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error")


@router.get("/all",
            response_model=list[CatOut],
            responses={**responses},
            status_code=status.HTTP_200_OK,
            description="Get all the cats")
async def get_all_cats(request: Request, pgdb: Database = Depends(get_db)):
    query = ("SELECT uu_id::text, title, description, latitude, longitude, picture_url, user_uu_id, created_at "
             "FROM tbl_cat ")
    try:
        res = await pgdb.fetch_all(query=query)
        # if not res:
        #     raise HTTPException(
        #         status_code=status.HTTP_404_NOT_FOUND, detail="There are not cats")
        base_url = str(request.base_url).rstrip("/")
        cats_list = []
        
        for cat in res:
            cat_dict = dict(cat)
            if cat_dict["picture_url"] and not cat_dict["picture_url"].startswith("http"):
                clean_path = cat_dict["picture_url"].lstrip("/")
                cat_dict["picture_url"] = f"{base_url}/{clean_path}"
            cats_list.append(cat_dict)
        return cats_list

    except Exception as ex:
        print(f"ERROR: {ex}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error")


@router.post("/new-cat",
             response_model=CatOut,
             status_code=status.HTTP_201_CREATED,
             description="A logged user add a new cat on the platform")
async def create_cat(
    request: Request,
    title: str = Form(...),
    description: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    image: UploadFile = File(...),
    current_user: UUID = Depends(get_current_user),
    pgdb: Database = Depends(get_db)):
    
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file must be an image"
        )
    extension = FileSystemPath(image.filename).suffix.lower()
    
    filename = f"{uuid.uuid4()}{FileSystemPath(image.filename).suffix}"
    file_path = UPLOAD_DIR / filename
    image_url = f"/uploads/cats/{filename}"
    user_uu_id: UUID = current_user["uu_id"]
    
    contents = await image.read() 
    with open(file_path, "wb") as buffer:
        buffer.write(contents)
    
    query = ("INSERT INTO tbl_cat (title, description, latitude, longitude, picture_url, user_uu_id) "
             "VALUES (:title, :description, :latitude, :longitude, :image_url, :user_uu_id) "
             "RETURNING uu_id::text, title, description, latitude, longitude, picture_url, "
              "user_uu_id, created_at ")
    
    values = {
        "title": title,
        "description": description,
        "latitude": latitude,
        "longitude": longitude,
        "image_url": image_url,
        "user_uu_id": user_uu_id
    }
    try:
        res = await pgdb.fetch_one(query=query, values=values)
        return res
    except Exception as ex:
        print(f"ERROR: {ex}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error")
    

