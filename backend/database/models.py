from sqlalchemy import Column, Integer, String, Float
from database.database import Base


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    phone = Column(String)

    education = Column(String)
    experience = Column(String)
    graduation_year = Column(String)

    skills = Column(String)

    similarity_score = Column(Float)
    skill_score = Column(Float)
    education_score = Column(Float)
    experience_score = Column(Float)
    eligibility_score = Column(Float)

    score = Column(Float)

    resume_path = Column(String)