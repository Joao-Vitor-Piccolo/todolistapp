from pydantic import BaseModel, EmailStr


class Message(BaseModel):
    message: str


class User_Schema(BaseModel):
    username: str
    email: EmailStr
    password: str

class ToDo_Schema(BaseModel):
    todo: str
    user_ID: str
