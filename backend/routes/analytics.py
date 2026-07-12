from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import Candidate

router = APIRouter()


@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):

    candidates = db.query(Candidate).all()

    total_candidates = len(candidates)

    average_score = db.query(
        func.avg(Candidate.score)
    ).scalar()

    score_distribution = []

    education_distribution = {}

    skill_counter = Counter()

    for candidate in candidates:

        score_distribution.append(candidate.score)

        education = candidate.education or "Unknown"

        education_distribution[education] = (
            education_distribution.get(education, 0) + 1
        )

        if candidate.skills:
            skills = candidate.skills.split(",")
            skill_counter.update(skills)

    return {
        "total_candidates": total_candidates,
        "average_score": round(average_score or 0, 2),
        "top_skills": skill_counter.most_common(10),
        "education_distribution": education_distribution,
        "score_distribution": score_distribution
    }