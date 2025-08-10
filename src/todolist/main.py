import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.staticfiles import StaticFiles
from src.todolist.schemas import *
from http import HTTPStatus
from src.todolist.database import get_session
from sqlalchemy import select, delete
from src.todolist.models import UserDB
from fastapi.staticfiles import StaticFiles
app = FastAPI()

current_dir = os.path.dirname(__file__)
static_dir = os.path.join(current_dir, "../staticFiles")

app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")


@app.post("/add", status_code=HTTPStatus.OK, response_model=Message)
async def add_task(task: str, session=Depends(get_session)):
