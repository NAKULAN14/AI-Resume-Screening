from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from services.pdf_reader import extract_text
from services.parser import parse_resume
from services.ranking_service import rank_candidates
from services.jd_parser import parse_job_description
from sqlalchemy.orm import Session
from database.database import get_db
from database.crud import create_candidate
import os,shutil

router = APIRouter()


@router.post("/rank")
async def rank_resumes(
    job_description: UploadFile = File(...),
    resumes: list[UploadFile] = File(...),
    db: Session = Depends(get_db)
):  

    if job_description.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Job Description must be a PDF."
        )

    if len(resumes) == 0:
        raise HTTPException(
            status_code=400,
            detail="Please upload at least one resume."
        )

    for resume in resumes:

        if resume.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail=f"{resume.filename} is not a PDF."
            )

    UPLOAD_FOLDER = "uploads"
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    parsed_resumes = []
    for resume in resumes:

        resume_path = os.path.join(UPLOAD_FOLDER, resume.filename)

        with open(resume_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)

        resume_text = extract_text(resume_path)

        candidate = parse_resume(resume_text)

        candidate["text"] = resume_text
        candidate["resume_path"] = resume_path
        candidate["resume_url"] = f"/files/{resume.filename}"

        parsed_resumes.append(candidate)
    job_description_text = extract_text(job_description.file)
    parsed_jd = parse_job_description(job_description_text)
    ranked_candidates = rank_candidates(
        job_description_text,
        parsed_resumes,parsed_jd
    )
    for candidate in ranked_candidates:
        create_candidate(db, candidate)
    return {
        "total_candidates": len(ranked_candidates),
        "rankings": ranked_candidates
    }