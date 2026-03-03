from fastapi import APIRouter, status, HTTPException
from pydantic import BaseModel, Field 
from api.database import pgdb
from fastapi.responses import JSONResponse
from uuid import UUID

class UserOut(BaseModel):
    uu_id: UUID = Field(..., title= "UUID of the user", example= "550e8400-e29b-41d4-a716-446655440000")
    email: str = Field(..., title= "email of the user", example= "giuliagargiulo@example.it")
    username: str = Field(..., title= "username of the user", example= "giuliagarg28")
    
responses = {
    status.HTTP_400_BAD_REQUEST: {"description": "Invalid request"},
    status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
    status.HTTP_404_NOT_FOUND: {"description": "Resource not found"}
}

router = APIRouter()

# ROUTES
# GET{username} : get user by username
# GET{id}: get user by id
# DELETE{id}: delete user by id (non necessario)

@router.get("/byID/{uu_id}",
            response_model= UserOut,
            responses = {**responses},
            status_code=status.HTTP_200_OK,
            description = "Get user by id")
async def get_user_by_id(uu_id: UUID):
    query = ("SELECT uu_id::text, email, username "
            "FROM tbl_user "
            "WHERE uu_id = :uu_id ")
    q_data= {"uu_id": uu_id}
    try:
        res = await pgdb.fetch_one(query=query, values=q_data)
        if not res:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return res
    except HTTPException:
        raise
    except Exception as ex:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Internal server error")
        
        
@router.get("/byUsername/{username}",
            response_model= UserOut,
            responses = {**responses},
            status_code=status.HTTP_200_OK,
            description = "Get user by username")
async def get_user_by_username(username: str):
    query = ("SELECT uu_id::text, email, username "
            "FROM tbl_user "
            "WHERE username = :username ")
    q_data= {"username": username}
    try:
        res = await pgdb.fetch_one(query=query, values=q_data)
        if not res:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return res
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error")
