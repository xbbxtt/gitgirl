"""
Pydantic Models for Users.
"""
from pydantic import BaseModel


class UserRequestSignUp(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    username: str
    password: str
    full_name: str
    email: str
    linkedin_url: str


class UserRequestSignIn(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    username: str
    password: str


class UserResponse(BaseModel):
    """
    Represents a user, with the password not included
    """

    id: int
    username: str
    full_name: str
    email: str
    linkedin_url: str


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """

    id: int
    username: str
    password: str
    full_name: str
    email: str
    linkedin_url: str
