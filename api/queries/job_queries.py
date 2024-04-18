import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional, List
from models.jobs import JobOut, JobIn, JobList
from models.users import UserWithPw
from utils.exceptions import UserDatabaseException


DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")


pool = ConnectionPool(DATABASE_URL)


class JobQueries:
    def get_all_jobs(self) -> List[JobOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, image_url, position_title, company_name,
                        job_description, creator_id
                        FROM jobs
                        """
                    )
                    result = []
                    for record in db:
                        job = JobOut(
                            id=record[0],
                            image_url=record[1],
                            position_title=record[2],
                            company_name=record[3],
                            job_description=record[4],
                            creator_id=record[5],
                        )
                        result.append(job)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all jobs"}

    def create_job(self, job: JobIn, creator_id: int) -> JobOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO jobs
                            (image_url, position_title, company_name,
                            job_description, creator_id)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            job.image_url,
                            job.position_title,
                            job.company_name,
                            job.job_description,
                            creator_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.job_in_to_out(id, job, creator_id)

        except Exception as e:
            print(e)
            return {"message": "Creation did not work"}

    def job_in_to_out(self, id: int, job: JobIn, creator_id: int):
        old_data = job.dict()
        return JobOut(id=id, **old_data, creator_id=creator_id)


