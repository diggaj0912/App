from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

users = []
events = []

class User(BaseModel):
    email: str
    password: str

@app.post("/signup")
def signup(user: User):
    users.append(user)
    return {"message": "User created"}

@app.post("/login")
def login(user: User):
    for u in users:
        if u.email == user.email and u.password == user.password:
            return {"message": "Login success"}
    return {"message": "Invalid credentials"}
