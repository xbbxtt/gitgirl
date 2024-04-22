from pydantic import BaseModel
from models.jobs import JobOut, JobOutPosterApp
from models.users import UserResponse, ApplicantOut
from datetime import datetime
from typing import List


class ApplicationOut(BaseModel):
    id: int
    job_id: int
    applicant_id: int
    applied_at: datetime


class ApplicationList(BaseModel):
    applications: List[ApplicationOut]
