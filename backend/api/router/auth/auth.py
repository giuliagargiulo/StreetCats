from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from api.database import get_db
from databases import Database
from datetime import datetime, timezone
from passlib.context import CryptContext
from api.router.user.user import UserOut, get_user_by_username
from api.router.auth.auth_util import create_access_token, get_current_user
from asyncpg.exceptions import UniqueViolationError

# ROUTES
# POST{}: login
# POST{}: register_user
# GET{}: read_current_user

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserLogin(BaseModel):
    username: str = Field(..., min_length=1)
    password: str = Field(..., min_length=1)
    
class UserCreate(UserLogin):
    email: str
    
class Token(BaseModel):
    access_token: str
    token_type: str

responses = {
    status.HTTP_400_BAD_REQUEST: {"description": "Invalid request"},
    status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
    status.HTTP_404_NOT_FOUND: {"description": "Resource not found"}
}

## register a new user
@router.post("/register",
             response_model = UserOut,
             responses = {**responses},
             status_code = status.HTTP_201_CREATED,
             description = "Register a new user",
             tags = ["Auth"])
async def register_user(user: UserCreate, pgdb = Depends(get_db)):
    query = ("INSERT INTO tbl_user (username, password, email) "
             "VALUES (:username, :password, :email) "
             "RETURNING uu_id::text, username, email ")
    q_data = user.model_dump()
    q_data["password"] = pwd_context.hash(user.password)    
    try:
        res = await pgdb.fetch_one(query=query, values=q_data)
        return res
    except UniqueViolationError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Username or email already exists")
       
       
@router.post("/login",
        response_model=Token,
        responses = {**responses},
        status_code = status.HTTP_200_OK,
        description = "Login an already registered user",
        tags = ["Auth"])
async def login(user: UserLogin, pgdb: Database = Depends(get_db)):
    user_db = await obtain_credentials(user.username, pgdb)
    if not user_db or not pwd_context.verify(user.password, user_db["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Wrong username or password",
            headers={"WWW-Authenticate": "Bearer"},)
        
    access_token = create_access_token(data={"sub": user_db["username"]})
    return {
        "access_token": access_token, 
        "token_type": "bearer"
    }
    
@router.get("/me", 
            response_model=UserOut,
            status_code=status.HTTP_200_OK,
            summary="Returns the current user",
            description="Returns the user owner of the token sent in the header",
            tags = ["Auth"])
async def read_current_user(current_user: UserOut = Depends(get_current_user)):
    return current_user


async def obtain_credentials(username: str, pgdb: Database):
    query = (
        "SELECT uu_id, username, password "
        "FROM tbl_user "
        "WHERE username = :username"
    )
    return await pgdb.fetch_one(query=query, values={"username": username})
