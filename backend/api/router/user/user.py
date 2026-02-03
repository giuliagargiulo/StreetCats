from pydantic import APIRouter, BaseModel, Field
from starlette import status
from database import pgsqldb, PGSQL_SCHEMA
from datetime import datetime


class UserIn(BaseModel):
    name: str = Field(..., title= "name of the user", example="Giulia")
    surname: str = Field(..., title= "surname of the user", example = "Gargiulo")
    email: str = Field(..., title= "email of the user", example= "giuliagargiulo@example.it")
    password: str = Field(..., title= "password of the user", example= "SecurePass123")
    username: str = Field(..., title= "username of the user", example= "giuliagarg28")
    
class UserOut(UserIn):
    uu_id: str = Field(..., title= "UUID of the user", example= "550e8400-e29b-41d4-a716-446655440000")
    created_at: datetime = Field(..., title= "Account creation timestamp", example= "2024-01-01T12:00:00Z")
    