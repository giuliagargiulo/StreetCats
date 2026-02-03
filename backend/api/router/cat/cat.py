from fastapi import APIRouter, Depends, Path, Body
from starlette import status

class Cat(BaseModel):
    

class CatOut(Cat):
    
    
responses = {
    status.HTTP_400_BAD_REQUEST: {"description": "Invalid request", "model": DetailSchema},
    status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized", "model": DetailSchema},
    status.HTTP_404_NOT_FOUND: {"description": "Resource not found", "model": DetailSchema}
} 
   
router = APIRouter()


