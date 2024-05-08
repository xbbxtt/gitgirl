"""
Database Queries for Users
"""
import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional
from models.users import UserWithPw, UserUpdate, UserResponse
from utils.exceptions import UserDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class UserQueries:
    """
    Class containing queries for the Users table

    Can be dependency injected into a route like so

    def my_route(userQueries: UserQueries = Depends()):
        # Here you can call any of the functions to query the DB
    """

    def get_by_username(self, username: str) -> Optional[UserWithPw]:
        """
        Gets a user from the database by username

        Returns None if the user isn't found
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                            SELECT
                                *
                            FROM users
                            WHERE username = %s
                            """,
                        [username],
                    )
                    user = cur.fetchone()
                    if not user:
                        return None
        except psycopg.Error as e:
            print(e)
            raise UserDatabaseException(f"Error getting user {username}")
        return user

    def get_by_id(self, id: int) -> Optional[UserWithPw]:
        """
        Gets a user from the database by user id

        Returns None if the user isn't found
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                            SELECT
                                *
                            FROM users
                            WHERE id = %s
                            """,
                        [id],
                    )
                    user = cur.fetchone()
                    if not user:
                        return None
        except psycopg.Error as e:
            print(e)
            raise UserDatabaseException(f"Error getting user with id {id}")

        return user

    def create_user(
            self,
            username: str,
            hashed_password: str,
            full_name: str,
            email: str,
            linkedin_url: str
            ) -> UserWithPw:
        """
        Creates a new user in the database

        Raises a UserInsertionException if creating the user fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                        INSERT INTO users (
                            username,
                            password,
                            full_name,
                            email,
                            linkedin_url
                        ) VALUES (
                            %s, %s, %s, %s, %s
                        )
                        RETURNING *;
                        """,
                        [
                            username,
                            hashed_password,
                            full_name,
                            email,
                            linkedin_url
                        ],
                    )
                    user = cur.fetchone()
                    if not user:
                        raise UserDatabaseException(
                            f"Could not create user with username {username}"
                        )
        except psycopg.Error:
            raise UserDatabaseException(
                f"Could not create user with username {username}"
            )
        return user


    def update_user(self, user_id: int, user: UserUpdate) -> UserResponse:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET username = %s,
                            full_name = %s,
                            email = %s,
                            linkedin_url = %s
                        WHERE id = %s
                        """,
                        [
                            user.username,
                            user.full_name,
                            user.email,
                            user.linkedin_url,
                            user_id
                        ]
                    )
                    old_data = user.dict()
                    return UserResponse(id=user_id, **old_data)
        except psycopg.Error:
            raise UserDatabaseException(
                f"Could not create user with username {user.username}"
            )
