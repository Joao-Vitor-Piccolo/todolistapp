from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from todolist.settings import Settings
from todolist.models import Base

engine = create_engine(Settings().DATABASE_URL)

def get_session():
    with Session(engine) as session:
        yield session

def create_table():
    Base.metadata.create_all(engine)
