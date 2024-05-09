from pydantic import BaseModel
from typing import List
from datetime import datetime


class JobIn(BaseModel):
    image_url: str
    position_title: str
    company_name: str
    location: str
    job_description: str


class JobOut(BaseModel):
    id: int
    image_url: str
    position_title: str
    company_name: str
    location: str
    job_description: str
    posted_date: datetime
    creator_id: int


class JobList(BaseModel):
    jobs: List[JobOut]
