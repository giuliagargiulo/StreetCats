import os
import databases

DATABASE_URL = os.getenv("DATABASE_URL", "got nothing")

database = databases.Database(DATABASE_URL)

async def get_db():
    yield database
            
