from fastapi.testclient import TestClient
import unittest
from datetime import datetime
from queries.application_queries import ApplicationQueries
from models.applications import ApplicationOut, ApplicationOutForPoster
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
                ApplicationOutForPoster(
                    id=1,
                    job_id=1,
                    full_name="John Doe",
                    email="john@example.com",
                    linkedin_url="https://www.linkedin.com/in/johndoe",
                    applied_at=datetime.now(),
                ),
                ApplicationOutForPoster(
                    id=2,
                    job_id=2,
                    full_name="Jane Doe",
                    email="jane@example.com",
                    linkedin_url="https://www.linkedin.com/in/janedoe",
                    applied_at=datetime.now(),
                ),
            ]
        }


    def get_application(self, applicant_id: int, job_id: int):
        return None


    def create_application(self, applicant_id: int, job_id: int):
        return ApplicationOut(
            id=3,
            job_id=2,
            applicant_id=3,
            applied_at=datetime.now()
        )


    @app.delete("/api/jobs/{job_id}/applications")
    async def delete_application(job_id: int):
        return {"message": "Application deleted"}


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

    def test_delete_application(self):
        app_id_to_delete = 1
        res = client.delete(f"/api/jobs/{app_id_to_delete}/applications")
        self.assertEqual(res.status_code, 200)


    def test_create_application(self):

        app.dependency_overrides[ApplicationQueries] = FakeApplicationsQueries
        app.dependency_overrides[try_get_jwt_user_data] = fake_try_get_jwt_user_data

        res = client.post("/api/jobs/2/applications")
        data = res.json()

        assert res.status_code == 200
        assert data["id"] == 3
        assert data["job_id"] == 2
