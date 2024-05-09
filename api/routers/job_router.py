from fastapi import Depends, Response, HTTPException, status, APIRouter
from queries.job_queries import JobQueries
from models.jobs import JobIn, JobOut, JobList
from models.users import UserResponse
from utils.authentication import try_get_jwt_user_data


router = APIRouter(tags=["Jobs"], prefix="/api/jobs")


@router.get("", response_model=JobList)
def get_all_jobs(
    job_queries: JobQueries = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
):
    if user is None:
        raise HTTPException(status_code=401, detail="You must be logged in.")

    jobs = job_queries.get_all_jobs()

    return jobs


@router.get("/mine", response_model=JobList)
def get_all_jobs_by_poster(
    job_queries: JobQueries = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
):
    if user is None:
        raise HTTPException(status_code=401, detail="You must be logged in.")

    jobs = job_queries.get_all_jobs_by_poster(creator_id=user.id)

    if jobs is not None:
        return jobs
    else:
        raise HTTPException(
            status_code=404, detail="You have not posted any jobs yet."
        )


@router.get("/{job_id}", response_model=JobOut)
def get_job_by_id(
    job_id: int,
    job_queries: JobQueries = Depends(),
):
    job = job_queries.get_job_by_id(job_id)
    if job:
        return job
    else:
        raise HTTPException(status_code=404, detail="Job not found.")


@router.post("", response_model=JobOut)
def create_job(
    job: JobIn,
    job_queries: JobQueries = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
):
    if user is None:
        raise HTTPException(status_code=401, detail="You must be logged in.")
    job = job_queries.create_job(job=job, creator_id=user.id)
    return job


@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job_by_id(
    job_id: int,
    job_queries: JobQueries = Depends(),
):
    if job_queries.delete_job(job_id):
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    else:
        raise HTTPException(status_code=404, detail="Job not found.")
