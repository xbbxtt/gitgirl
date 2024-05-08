"""
User Authentication API Router
"""

from fastapi import (
    Depends,
    Request,
    Response,
    HTTPException,
    status,
    APIRouter,
)
from queries.user_queries import (
    UserQueries,
)

from utils.exceptions import UserDatabaseException
from models.users import UserRequestSignIn, UserRequestSignUp, UserResponse, UserUpdate

from utils.authentication import (
    try_get_jwt_user_data,
    hash_password,
    generate_jwt,
    verify_password,
)

# Note we are using a prefix here,
# This saves us typing in all the routes below
router = APIRouter(tags=["Authentication"], prefix="/api/auth")


@router.post("/signup")
async def signup(
    new_user: UserRequestSignUp,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
) -> UserResponse:
    """
    Creates a new user when someone submits the signup form
    """
    # Hash the password the user sent us
    hashed_password = hash_password(new_user.password)

    # Create the user in the database
    try:
        user = queries.create_user(
            new_user.username,
            hashed_password,
            new_user.full_name,
            new_user.email,
            new_user.linkedin_url,
        )
    except UserDatabaseException as e:
        print(e)
        raise HTTPException(
            status_code=401,
            detail="Username or Email already exists in our database.",
        )

    # Generate a JWT token
    token = generate_jwt(user)

    # Convert the UserWithPW to a UserOut
    user_out = UserResponse(**user.model_dump())

    # Secure cookies only if running on something besides localhost
    secure = True if request.headers.get("origin") == "localhost" else False

    # Set a cookie with the token in it
    response.set_cookie(
        key="fast_api_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=secure,
    )
    return user_out


@router.post("/signin")
async def signin(
    user_request: UserRequestSignIn,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
) -> UserResponse:
    """
    Signs the user in when they use the Sign In form
    """

    # Try to get the user from the database
    user = queries.get_by_username(user_request.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sorry, we couldn't find an account with those \
                    credentials.",
        )

    # Verify the user's password
    if not verify_password(user_request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sorry, we couldn't find an account with those \
                    credentials.",
        )

    # Generate a JWT token
    token = generate_jwt(user)

    # Secure cookies only if running on something besides localhost
    secure = True if request.headers.get("origin") == "localhost" else False

    # Set a cookie with the token in it
    response.set_cookie(
        key="fast_api_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=secure,
    )

    # Convert the UserWithPW to a UserOut
    return UserResponse(
        id=user.id,
        username=user.username,
        full_name=user.full_name,
        email=user.email,
        linkedin_url=user.linkedin_url,
    )


@router.get("/authenticate")
async def authenticate(
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> UserResponse | None:
    """
    This function returns the user if the user is logged in.

    The `try_get_jwt_user_data` function tries to get the user and validate
    the JWT

    If the user isn't logged in this returns a 404

    This can be used in your frontend to determine if a user
    is logged in or not
    """
    return user


@router.delete("/signout")
async def signout(
    request: Request,
    response: Response,
):
    """
    Signs the user out by deleting their JWT Cookie
    """
    # Secure cookies only if running on something besides localhost
    secure = True if request.headers.get("origin") == "localhost" else False

    # Delete the cookie
    response.delete_cookie(
        key="fast_api_token", httponly=True, samesite="lax", secure=secure
    )

    # There's no need to return anything in the response.
    # All that has to happen is the cookie header must come back
    # Which causes the browser to delete the cookie
    return

@router.put("/update", response_model=UserResponse)
async def update_user(
    user_data: UserUpdate,
    request: Request,
    response: Response,
    user_queries: UserQueries = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
):
    try:
        updated_user = user_queries.update_user(user_id=user.id, user=user_data)

    except UserDatabaseException as e:
        print(e)
        raise HTTPException(
            status_code=401,
            detail="Username or Email already exists in our database.",
        )

    updated_user = user_queries.get_by_id(user.id)

    # Generate a JWT token
    token = generate_jwt(updated_user)

    # Secure cookies only if running on something besides localhost
    secure = True if request.headers.get("origin") == "localhost" else False

    # Set a cookie with the token in it
    response.set_cookie(
        key="fast_api_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=secure,
    )

    return UserResponse(
        id=user.id,
        username=updated_user.username,
        full_name=updated_user.full_name,
        email=updated_user.email,
        linkedin_url=updated_user.linkedin_url
        )
