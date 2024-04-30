from fastapi.testclient import TestClient
import unittest
from queries.job_queries import JobQueries
from models.jobs import JobList, JobOut, JobIn
from models.users import UserResponse
from utils.authentication import try_get_jwt_user_data
from main import app

client = TestClient(app)


def fake_try_get_jwt_user_data():
    return UserResponse(
        id=1,
        full_name="Crazy Man",
        email="crazy_man@gmail.com",
        linkedin_url="https://www.linkedin.com/in/crazy",
        username="crazy_man"
    )


class FakeJobQueries:
    def get_all_jobs(self):
        return [
            JobOut(
                id=1,
                image_url="https://via.placeholder.com/150",
                position_title="Software Engineer",
                company_name="Google",
                job_description="Software Engineer at Google",
                creator_id=1
            ),
            JobOut(
                id=2,
                image_url="https://via.placeholder.com/150",
                position_title="Software Engineer",
                company_name="Facebook",
                job_description="Software Engineer at Facebook",
                creator_id=1
            )
        ]
        return JobList(jobs=jobs)

    def get_all_jobs_by_poster(self, creator_id: int):
        return [
            JobOut(
                id=1,
                image_url="https://via.placeholder.com/150",
                position_title="Software Engineer",
                company_name="Google",
                job_description="Software Engineer at Google",
                creator_id=creator_id
            ),
            JobOut(
                id=2,
                image_url="https://via.placeholder.com/150",
                position_title="Software Engineer",
                company_name="Facebook",
                job_description="Software Engineer at Facebook",
                creator_id=creator_id
            )
        ]
        return jobs


    def get_job_by_id(self, job_id: int):
        return JobOut(
            id=job_id,
            image_url="https://via.placeholder.com/150",
            position_title="Software Engineer",
            company_name="Google",
            job_description="Software Engineer at Google",
            creator_id=1
        )

    def create_job(self, job: JobIn, creator_id: int):
        return JobOut(
            id=3,
            image_url=job.image_url,
            position_title=job.position_title,
            company_name=job.company_name,
            job_description=job.job_description,
            creator_id=creator_id
        )


class TestJobs(unittest.TestCase):
    def fake_job_queries(self):
        return FakeJobQueries()

    def test_get_all_jobs(self):
        app.dependency_overrides[JobQueries] = FakeJobQueries
        app.dependency_overrides[try_get_jwt_user_data] = fake_try_get_jwt_user_data

        res = client.get("/api/jobs")
        data = res.json()

        assert res.status_code == 200
        assert len(data["jobs"]) == 2

    def test_get_all_jobs_by_poster(self):

        app.dependency_overrides[JobQueries] = FakeJobQueries
        app.dependency_overrides[try_get_jwt_user_data] = fake_try_get_jwt_user_data

        res = client.get("/api/jobs/mine")
        data = res.json()

        assert res.status_code == 200
        assert len(data["jobs"]) == 2

    def test_get_job_by_id(self):
        app.dependency_overrides[JobQueries] = FakeJobQueries

        res = client.get("/api/jobs/1")
        data = res.json()

        assert res.status_code == 200
        assert data["id"] == 1
        assert data["company_name"] == "Google"

    def test_create_job(self):

        app.dependency_overrides[JobQueries] = FakeJobQueries
        app.dependency_overrides[try_get_jwt_user_data] = fake_try_get_jwt_user_data
        job_data = {
            "image_url": "https://via.placeholder.com/150",
            "position_title": "Software Engineer",
            "company_name": "Apple",
            "job_description": "Software Engineer at Apple"
        }

        res = client.post("/api/jobs", json=job_data)
        data = res.json()

        assert res.status_code == 200
        assert data["id"] == 3
        assert data["company_name"] == "Apple"
