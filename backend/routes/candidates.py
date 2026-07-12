from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import Candidate

router = APIRouter()


@router.get("/candidates")
def get_candidates(db: Session = Depends(get_db)):
    return db.query(Candidate).order_by(Candidate.score.desc()).all()


@router.get("/candidates/{candidate_id}")
def get_candidate(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(Candidate).filter(
        Candidate.id == candidate_id
    ).first()

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    return candidate


@router.delete("/candidates/{candidate_id}")
def delete_candidate(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(Candidate).filter(
        Candidate.id == candidate_id
    ).first()

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    db.delete(candidate)
    db.commit()

    return {"message": "Candidate deleted successfully"}