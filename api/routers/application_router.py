from fastapi import (
    Depends,
    Request,
    Response,
    HTTPException,
    status,
    APIRouter,
)
from queries.user_queries import UserQueries
from queries.job_queries import JobQueries
from queries.application_queries import ApplicationQueries
from models.jobs import JobIn, JobOut, JobList
from models.applications import (
    ApplicationOut,
    ApplicationList,
    ApplicationListForPoster
)
from models.users import UserResponse
from utils.exceptions import UserDatabaseException
from utils.authentication import (
    try_get_jwt_user_data,
    hash_password,
    generate_jwt,
    verify_password,
)
from datetime import datetime
from typing import List


router = APIRouter(tags=["Applications"], prefix="/api")


    # Gets a list of a job seekers applications
@router.get(
        "/applications/mine",
        response_model=ApplicationList
)
def get_all_apps_for_job_seeker(
    application_queries: ApplicationQueries = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data)
):
    if user is None:
        raise HTTPException(status_code=401, detail="You must be logged in")

    applications = application_queries.list_apps_for_job_seeker(
        user_id=user.id
    )

    if applications is not None:
        return applications
    else:
        raise HTTPException(
                status_code=404,
                detail="You have no applications"
            )


    # Deletes an application by the application's ID
@router.delete("/applications/{app_id}", response_model=bool)
def delete_app_by_id(
    app_id: int,
    app_queries: ApplicationQueries = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data)
):
    if user is None:
        raise HTTPException(status_code=401, detail="You must be logged in")

    if app_queries.delete_application(app_id):
        return True
    else:
        raise HTTPException(status_code=404, detail="Application not found")


    #  Get a list of applications by job for that job's poster
@router.get(
        "/jobs/{job_id}/applications",
        response_model=ApplicationListForPoster
)
def get_all_apps_for_poster_by_job(
    job_id: int,
    application_queries: ApplicationQueries = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data)
):
    if user is None:
        raise HTTPException(status_code=401, detail="You must be logged in")

    applications = application_queries.list_apps_for_poster_by_job(
        creator_id=user.id,
        job_id=job_id
    )
    if applications is not None:
        return applications
    else:
        raise HTTPException(
                status_code=404,
                detail="You have no applicants for this job posting"
            )


    # Creates an application for job seeker
@router.post("/jobs/{job_id}/applications", response_model=ApplicationOut)
def create_application(
    job_id: int,
    application_queries: ApplicationQueries = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data)
):
    if user is None:
        raise HTTPException(status_code=401, detail="You must be logged in")
    application = application_queries.get_application(
        applicant_id=user.id,
        job_id=job_id
    )
    if application is not None:
        raise HTTPException(
            status_code=401,
            detail="You have already applied to this job."
        )
    else:
        application = application_queries.create_application(
            applicant_id=user.id,
            job_id=job_id
            )
        return application
