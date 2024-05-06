from fastapi.testclient import TestClient
import unittest
from datetime import datetime
from queries.application_queries import ApplicationQueries
from models.applications import ApplicationOut
from models.users import UserResponse
from utils.authentication import try_get_jwt_user_data
from main import app


client = TestClient(app)


class FakeApplicationsQueries:
    def list_apps_for_job_seeker(self, user_id: int):
        return {
            "applications": [
                ApplicationOut(
                    id=1,
                    job_id=1,
                    applicant_id=1,
                    applied_at=datetime.now(),
                ),
                ApplicationOut(
                    id=2,
                    job_id=2,
                    applicant_id=2,
                    applied_at=datetime.now(),
                ),
            ]
        }

    def list_apps_for_poster_by_job(self, creator_id: int, job_id: int):
        return {
            "applications": [
                ApplicationOut(
                    id=1,
                    job_id=1,
                    applicant_id=1,
                    applied_at=datetime.now(),
                    creator_id=creator_id,
                ),
                ApplicationOut(
                    id=2,
                    job_id=2,
                    applicant_id=2,
                    applied_at=datetime.now(),
                    creator_id=creator_id,
                ),
            ]
        }


def fake_try_get_jwt_user_data():
    return UserResponse(
        id=1,
        full_name="Crazy Man",
        email="crazy_man@gmail.com",
        linkedin_url="https://www.linkedin.com/in/crazy",
        username="crazy_man",
    )


class TestApplications(unittest.TestCase):
    def fake_application_queries(self):
        return FakeApplicationsQueries()

    def test_list_apps_for_job_seeker(self):
        app.dependency_overrides[ApplicationQueries] = FakeApplicationsQueries
        app.dependency_overrides[try_get_jwt_user_data] = (
            fake_try_get_jwt_user_data
        )

        res = client.get("/api/applications/mine")
        data = res.json()

        assert res.status_code == 200
        assert len(data["applications"]) == 2

    def test_list_apps_for_poster_by_job(self):
        app.dependency_overrides[ApplicationQueries] = FakeApplicationsQueries
        app.dependency_overrides[try_get_jwt_user_data] = (
            fake_try_get_jwt_user_data
        )

        res = client.get("/api/jobs/123/applications")
        data = res.json()

        assert res.status_code == 200
        assert len(data["applications"]) == 2
