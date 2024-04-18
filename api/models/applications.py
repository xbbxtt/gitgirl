from pydantic import BaseModel
from jobs import JobOut
from users import UserApplicant, UserResponse
import datetime
from typing import List


class ApplicationIn(BaseModel):
    job_id: int
    user_id: int


class ApplicationOut(BaseModel):
    id: int
    applied_at: datetime
    job: JobOut
    applicant: UserResponse


class ApplicationList(BaseModel):
    applications: List[ApplicationOut]
