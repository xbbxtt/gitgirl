from fastapi.testclient import TestClient
import unittest
from queries.job_queries import JobQueries
from models.jobs import JobList, JobOut
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
        jobs = [
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
                creator_id=1)
        ]
        return JobList(jobs=jobs)

    def get_all_jobs_by_poster(self, creator_id: int):
        jobs = [
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
                creator_id=1)
        ]
        return jobs


class TestJobs(unittest.TestCase):
    def test_get_all_jobs(self):
        # arrange
        app.dependency_overrides[JobQueries] = FakeJobQueries
        app.dependency_overrides[try_get_jwt_user_data] = fake_try_get_jwt_user_data
        # act
        res = client.get("/api/jobs")
        data = res.json()
        # assert
        assert res.status_code == 200
        assert len(data["jobs"]) == 2

    def test_get_all_jobs_by_poster(self):
        # arrange
        app.dependency_overrides[JobQueries] = FakeJobQueries
        app.dependency_overrides[try_get_jwt_user_data] = fake_try_get_jwt_user_data
        # act
        res = client.get("/api/jobs/mine")
        data = res.json()
        # assert
        assert res.status_code == 200
        assert len(data["jobs"]) == 2
