from pydantic import APIRouter, BaseModel, Field
from starlette import status
from database import pgsqldb, PGSQL_SCHEMA
from datetime import date

class UserIn(BaseModel):
    name: str = Field(..., title= "name of the user", example="Giulia")
    surname: str = Field(..., title= "surname of the user", example = "Gargiulo")
    email: str = Field(..., title= "email of the user", example= "giuliagargiulo@example.it")
    password: str = 
    username: str
    