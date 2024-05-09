import os
from psycopg_pool import ConnectionPool
from models.applications import (
    ApplicationOut,
    ApplicationList,
    ApplicationListForPoster
)


DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")


pool = ConnectionPool(DATABASE_URL)


class ApplicationQueries:
    def list_apps_for_job_seeker(
                            self,
                            user_id: int,
                            ) -> ApplicationList:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                          a.id, a.job_id, a.applicant_id, a.applied_at
                        FROM applications a
                        WHERE a.applicant_id = %s
                        GROUP BY
                          a.id, a.job_id, a.applicant_id, a.applied_at
                        ORDER BY a.applied_at
                        """,
                        [
                            user_id
                        ]
                    )

                    applications = []
                    rows = db.fetchall()
                    print(rows)

                    for row in rows:
                        application = None
                        if row is not None:
                            application = {}
                            application_fields = [
                                "id",
                                "job_id",
                                "applicant_id",
                                "applied_at",
                            ]
                            for i, column in enumerate(db.description):
                                if column.name in application_fields:
                                    application[column.name] = row[i]
                        applications.append(application)

                    if not applications:
                        return None
                    else:
                        return ApplicationList(applications=applications)

        except Exception:
            return {
                "message": "Could not get all applications for your job posts"
                }

    def list_apps_for_poster_by_job(
                            self,
                            creator_id: int,
                            job_id: int
                            ) -> ApplicationListForPoster:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                          a.id, a.job_id, u.full_name,
                          u.email, u.linkedin_url, a.applied_at
                        FROM jobs j
                        JOIN applications a ON(j.id=a.job_id)
                        JOIN users u ON(a.applicant_id=u.id)
                        WHERE j.creator_id = %s
                        AND j.id = %s
                        GROUP BY
                          a.id, a.job_id, u.full_name, u.email,
                          u.linkedin_url, a.applied_at
                        ORDER BY a.applied_at
                        """,
                        [
                            creator_id,
                            job_id
                        ]
                    )

                    applications = []
                    rows = db.fetchall()

                    for row in rows:
                        application = None
                        if row is not None:
                            application = {}
                            application_fields = [
                                "id",
                                "job_id",
                                "full_name",
                                "email",
                                "linkedin_url",
                                "applied_at",
                            ]
                            for i, column in enumerate(db.description):
                                if column.name in application_fields:
                                    application[column.name] = row[i]
                        applications.append(application)

                    if not applications:
                        return None
                    else:
                        return ApplicationListForPoster(applications=applications)

        except Exception:
            return {
                "message": "Could not get all applications for your job posts"
                }

    def get_application(self, applicant_id: int, job_id: int) -> ApplicationOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, job_id, applicant_id, applied_at
                        FROM applications
                        WHERE applicant_id = %s
                        AND job_id = %s
                        """,
                        [
                            applicant_id,
                            job_id,
                        ],
                    )
                    record = db.fetchone()
                    if record:
                        return ApplicationOut(
                            id=record[0],
                            job_id=record[1],
                            applicant_id=record[2],
                            applied_at=record[3],
                        )
                    else:
                        return None
        except Exception:
            return None

    def create_application(self, applicant_id: int, job_id: int) -> ApplicationOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO applications
                            (applicant_id, job_id)
                        VALUES
                            (%s, %s)
                        RETURNING id, applied_at;
                        """,
                        [
                            applicant_id,
                            job_id,
                        ]
                    )
                    application_info = result.fetchone()
                    print(application_info)

                    id = application_info[0]
                    applied_at = application_info[1]

                    return ApplicationOut(
                        id=id,
                        applied_at=applied_at,
                        applicant_id=applicant_id,
                        job_id=job_id
                    )

        except Exception as e:
            print(e)
            return {"message": "Application did not post"}

    def delete_application(self, app_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM applications
                        WHERE id = %s
                        """,
                        [app_id],
                    )
                    return db.rowcount > 0

        except Exception as e:
            print(e)
            return False
