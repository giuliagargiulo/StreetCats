import os
import databases

DATABASE_URL = os.getenv("DATABASE_URL", "got nothing")

pgdb = databases.Database(DATABASE_URL)
PGSQL_SCHEMA = "streetcats"

async def get_db():
    if not pgdb.is_connected:
        await pgdb.connect()
    try:
        yield pgdb
    finally:
        if pgdb.is_connected:
            await pgdb.disconnect()
            
