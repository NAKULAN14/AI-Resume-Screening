from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import engine
from database.models import Base
from routes.upload import router as upload_router
from routes.ranking import router as ranking_router
from fastapi.staticfiles import StaticFiles
from routes.candidates import router as candidates_router
from fastapi.responses import FileResponse
from routes.analytics import router as analytics_router
import os

app = FastAPI(
    title="AI Resume Screening System",
    description="An AI-powered Applicant Tracking System (ATS) that ranks resumes using NLP and Sentence Transformers.",
    version="1.0.0"
)
Base.metadata.create_all(bind=engine)

app.mount(
    "/files",
    StaticFiles(directory="uploads"),
    name="files"
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    upload_router,
    prefix="/upload",
    tags=["Upload"]
)

app.include_router(
    ranking_router,
    prefix="/ranking",
    tags=["Ranking"]
)
app.include_router(
    candidates_router,
    tags=["Candidates"]
)

app.include_router(
    analytics_router,
    tags=["Analytics"]
)
app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    return FileResponse("frontend/dist/index.html")

@app.get("/", tags=["Home"])
def home():
    return {
        "message": "AI Resume Screening System is Running",
        "version": "1.0.0",
        "status": "Healthy"
    }

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "OK",
        "database": "Connected",
        "ai_model": "Loaded"
    }
frontend_dir = os.path.join("frontend", "dist")
if os.path.exists(frontend_dir):
    app.mount(
        "/assets",
        StaticFiles(directory=os.path.join(frontend_dir, "assets")),
        name="assets"
    )
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        return FileResponse(os.path.join(frontend_dir, "index.html"))   