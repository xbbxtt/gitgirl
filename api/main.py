from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth_router, job_router, application_router
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(job_router.router)
app.include_router(application_router.router)
