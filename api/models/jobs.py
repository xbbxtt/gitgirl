from pydantic import BaseModel
from typing import List


class JobIn(BaseModel):
    """
    Represents a the parameters needed to create a new Job
    """
    image_url: str
    position_title: str
    company_name: str
    job_description: str


class JobOut(BaseModel):
    """
    Represents a the parameters expected when getting
    a Job from database
    """
    id: int
    image_url: str
    position_title: str
    company_name: str
    job_description: str
    creator_id: int


class JobList(BaseModel):
    jobs: List[JobOut]
