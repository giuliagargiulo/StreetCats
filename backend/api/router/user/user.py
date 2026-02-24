from pydantic import APIRouter, BaseModel, Field, Depends
from starlette import status
from database import PGSQL_SCHEMA, pgdb
from databases import Database
from datetime import datetime
from datetime import datetime, timezone
from fastapi.responses import JSONResponse

class UserIn(BaseModel):
    name: str = Field(..., title= "name of the user", example="Giulia")
    surname: str = Field(..., title= "surname of the user", example = "Gargiulo")
    email: str = Field(..., title= "email of the user", example= "giuliagargiulo@example.it")
    password: str = Field(..., title= "password of the user", example= "SecurePass123")
    username: str = Field(..., title= "username of the user", example= "giuliagarg28")
    
class UserOut(UserIn):
    uu_id: str = Field(..., title= "UUID of the user", example= "550e8400-e29b-41d4-a716-446655440000")
    created_at: datetime = Field(..., title= "Account creation timestamp", example= "2024-01-01T12:00:00Z")
    
responses = {
    status.HTTP_400_BAD_REQUEST: {"description": "Invalid request"},
    status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
    status.HTTP_404_NOT_FOUND: {"description": "Resource not found"}
}

router = APIRouter()

# ROUTES
# POST : create a new user
# GET{username} : get user by username
# GET{id}: get user by id
# DELETE{id}: delete user by id (non necessario)

@router.get("/byID/{uu_id}",
            responseModel= UserOut,
            responses = {**responses},
            status_code=status.HTTP_200_OK,
            description = "Get user by id")
async def get_user_by_id(uu_id: str):
    query = ("SELECT uu_id::text, name, surname, email, password, username, created_at"
            "FROM tbl_user"
            "WHERE uu_id = :uu_id")
    q_data= {"uu_id": uu_id}
    try:
        res = await pgdb.fetch_one(query=query, values=q_data)
        if not res:
            return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, 
                                content={"detail": "User not found"})
        return res
    except Exception as ex:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, 
                            content={"detail": str(ex)})
        
        
@router.get("/byUsername/{username}",
            responseModel= UserOut,
            responses = {**responses},
            status_code=status.HTTP_200_OK,
            description = "Get user by username")
async def get_user_by_username(username: str):
    query = ("SELECT uu_id::text, name, surname, email, password, username, created_at"
            "FROM tbl_user"
            "WHERE username = :username")
    q_data= {"username": username}
    try:
        res = await pgdb.fetch_one(query=query, values=q_data)
        if not res:
            return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, 
                                content={"detail": "User not found"})
        return res
    except Exception as ex:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, 
                            content={"detail": str(ex)})


@router.post("/new/",
             responseModel = UserOut,
             responses = {**responses},
             status_code=status.HTTP_201_CREATED,
             description = "Create a new user",
             tags =["User"])
async def create_user(user: UserIn):
    query = ("INSERT INTO tbl_user (name, surname, email, password, username)"
             "VALUES (:name, :surname, :email, :password, :username)"
             "RETURNING uu_id::text")
    q_data = user.dict()
    q_data['created_at'] = datetime.now(timezone.utc)
    
    try:
        res = await pgdb.fetch_one(query=query, values=q_data)
        return await get_user_by_id(res[0])
    except Exception as ex:
       return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, 
                           content={"detail": str(ex)})
        
    
    
