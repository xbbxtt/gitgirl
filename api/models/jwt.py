from pydantic import BaseModel


class JWTUserData(BaseModel):
    id: int
    username: str
    full_name: str
    email: str
    linkedin_url: str


class JWTPayload(BaseModel):
    user: JWTUserData
    sub: str
    exp: int
