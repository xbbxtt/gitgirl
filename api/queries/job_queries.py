import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional, List
from models.jobs import JobOut, JobIn, JobList
from models.users import UserWithPw
from utils.exceptions import UserDatabaseException
from datetime import datetime


DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")


pool = ConnectionPool(DATABASE_URL)


class JobQueries:
    def get_all_jobs(self) -> JobList:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, image_url, position_title, company_name,
                        location, job_description, posted_date, creator_id
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
                            location=record[4],
                            job_description=record[5],
                            posted_date=record[6],
                            creator_id=record[7]
                        )
                        result.append(job)
                    return JobList(jobs=result)
        except Exception as e:
            print(e)
            return {"message": "Could not get all jobs"}

    def get_all_jobs_by_poster(self, creator_id: int) -> JobList:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, image_url, position_title, company_name,
                        location, job_description, posted_date, creator_id
                        FROM jobs
                        WHERE creator_id = %s
                        """,
                        [
                            creator_id
                        ]
                    )
                    result = []
                    for record in db:
                        job = JobOut(
                            id=record[0],
                            image_url=record[1],
                            position_title=record[2],
                            company_name=record[3],
                            location=record[4],
                            job_description=record[5],
                            posted_date=record[6],
                            creator_id=record[7]
                        )
                        result.append(job)

                    if not result:
                        return None
                    else:
                        return JobList(jobs=result)
        except Exception as e:
            print(e)
            return {"message": "Could not get all jobs"}


    def get_job_by_id(self, job_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, image_url, position_title, company_name,
                        location, job_description, posted_date, creator_id
                        FROM jobs
                        WHERE id = %s
                        """,
                        [job_id],
                    )
                    record = db.fetchone()
                    if record:
                        return JobOut(
                            id=record[0],
                            image_url=record[1],
                            position_title=record[2],
                            company_name=record[3],
                            location=record[4],
                            job_description=record[5],
                            posted_date=record[6],
                            creator_id=record[7]
                        )
                    else:
                        return None
        except Exception as e:
            print(e)
            return None

    def create_job(self, job: JobIn, creator_id: int) -> JobOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO jobs
                            (image_url, position_title, company_name,
                            location, job_description, creator_id)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id, posted_date;
                        """,
                        [
                            job.image_url,
                            job.position_title,
                            job.company_name,
                            job.location,
                            job.job_description,
                            creator_id,
                        ],
                    )

                    job_info = result.fetchone()
                    print(job_info)

                    id = job_info[0]
                    posted_date = job_info[1]

                    return self.job_in_to_out(id, posted_date, job, creator_id)

        except Exception as e:
            print(e)
            return {"message": "Creation did not work"}

    def delete_job(self, job_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM jobs
                        WHERE id = %s
                        """,
                        [job_id],
                    )
                    return db.rowcount > 0
        except Exception as e:
            print(e)
            return False

    def job_in_to_out(self, id: int, posted_date: datetime, job: JobIn, creator_id: int):
        old_data = job.dict()
        return JobOut(id=id, posted_date=posted_date, **old_data, creator_id=creator_id)
