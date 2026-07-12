from sqlalchemy.orm import Session
from database.models import Candidate


def create_candidate(db: Session, candidate_data):

    existing_candidate = (
        db.query(Candidate)
        .filter(Candidate.email == candidate_data["email"])
        .first()
    )

    if existing_candidate:
        return existing_candidate

    candidate = Candidate(
        name=candidate_data["name"],
        email=candidate_data["email"],
        phone=candidate_data["phone"],
        education=candidate_data["education"],
        experience=candidate_data["experience"],
        graduation_year=candidate_data.get("batch"),
        skills=",".join(candidate_data["skills"]),
        similarity_score=candidate_data["similarity_score"],
        skill_score=candidate_data["skill_score"],
        education_score=candidate_data["education_score"],
        experience_score=candidate_data["experience_score"],
        eligibility_score=candidate_data["eligibility_score"],
        score=candidate_data["final_score"],
        resume_path=candidate_data["resume_path"]
    )

    db.add(candidate)
    db.commit()
    db.refresh(candidate)

    return candidate