import os
from fastapi import FastAPI, HTTPException, Depends
from todolist.schemas import *
from http import HTTPStatus
from todolist.database import get_session
from fastapi.staticfiles import StaticFiles
from todolist.models import UserDB, Item
from sqlalchemy import select
from pwdlib import PasswordHash
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from jwt import encode

app = FastAPI()

current_dir = os.path.dirname(__file__)
static_dir = os.path.join(current_dir, "../staticFiles")


ACCESS_TOKEN_EXPIRE_MINUTES = 30

@app.post("/add", status_code=HTTPStatus.OK, response_model=Message)
def add_task(toDo: ToDo_Schema, session=Depends(get_session)):
    pass


@app.post("/create_user/", status_code=HTTPStatus.CREATED, response_model=Message)
def add_user(user: User_Schema, session=Depends(get_session)):
    db_user = session.scalar(
        select(UserDB).where((UserDB.username == user.username) | (UserDB.email == user.email))
    )
    if db_user:
        raise HTTPException(status_code=HTTPStatus.CONFLICT, detail="Email or Username Already exists")
    else:
        db_user = UserDB(
                    username=user.username, email=user.email,
                    password=PasswordHash.recommended().hash(user.password)
                         )

        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return {'message': 'User created!'}


app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
