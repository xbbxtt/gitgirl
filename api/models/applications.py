from pydantic import BaseModel
import datetime
from typing import List


class ApplicationIn(BaseModel):
    job_id: int
    user_id: int


class ApplicationOut(BaseModel):
    id: int
    applied_at: datetime
    job_id: int
    applicant_id: int


class ApplicationList(BaseModel):
    applications: List[ApplicationOut]
