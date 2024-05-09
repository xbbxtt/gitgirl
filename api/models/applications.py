from pydantic import BaseModel
from datetime import datetime
from typing import List


class ApplicationOut(BaseModel):
    id: int
    job_id: int
    applicant_id: int
    applied_at: datetime


class ApplicationOutForPoster(BaseModel):
    id: int
    job_id: int
    full_name: str
    email: str
    linkedin_url: str
    applied_at: datetime


class ApplicationList(BaseModel):
    applications: List[ApplicationOut]


class ApplicationListForPoster(BaseModel):
    applications: List[ApplicationOutForPoster]
