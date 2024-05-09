from pydantic import BaseModel


class UserRequestSignUp(BaseModel):
    username: str
    password: str
    full_name: str
    email: str
    linkedin_url: str


class UserRequestSignIn(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    full_name: str
    email: str
    linkedin_url: str


class UserWithPw(BaseModel):
    id: int
    username: str
    password: str
    full_name: str
    email: str
    linkedin_url: str


class UserUpdate(BaseModel):
    username: str
    full_name: str
    email: str
    linkedin_url: str
