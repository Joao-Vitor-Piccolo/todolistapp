import os

from fastapi import FastAPI, HTTPException, Depends
from fastapi.staticfiles import StaticFiles

app = FastAPI()

current_dir = os.path.dirname(__file__)
static_dir = os.path.join(current_dir, "../staticFiles")

app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")


