import re
from data import skills

def extract_email(text):
    pattern = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
    match = re.search(pattern, text)
    return match.group() if match else None


def extract_phone(text):
    pattern = r"(?:\+91[- ]?)?[6-9]\d{9}"
    match = re.search(pattern, text)
    return match.group() if match else None


def extract_name(text):
    lines = [line.strip() for line in text.split("\n") if line.strip()]

    for line in lines[:10]:
        if "@" in line:
            continue
        if re.search(r"\d", line):
            continue
        if line.lower() in ["resume", "curriculum vitae", "cv"]:
            continue
        if re.fullmatch(r"[A-Za-z ]+", line):
            words = line.split()
            if 2 <= len(words) <= 4:
                return line

    return "Unknown"


def extract_skills(text):
    matched = []
    text = text.lower()

    for skill in skills.SKILLS:
        if skill.lower() in text:
            matched.append(skill)

    return matched


def extract_education(text):
    degrees = [
        "B.Tech", "B.E", "M.Tech", "M.E",
        "BCA", "MCA", "B.Sc", "M.Sc",
        "Bachelor", "Master"
    ]

    text = text.lower()

    for degree in degrees:
        if degree.lower() in text:
            return degree

    return "Not Specified"


def extract_experience(text):
    pattern = r"(\d+\s*[-+]\s*\d*\s*years|\d+\+?\s*years)"
    match = re.search(pattern, text.lower())
    return match.group() if match else "Not Specified"


def extract_batch(text):

    education = re.search(
        r"Education(.*?)(Projects|Experience|Skills|Technical Skills|Certifications|$)",
        text,
        re.DOTALL | re.IGNORECASE
    )

    if education:
        section = education.group(1)

        match = re.search(r"(20\d{2})\s*[-–]\s*(20\d{2})", section)

        if match:
            return match.group(2)

    return "Not Found"


def parse_resume(text):
    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "education": extract_education(text),
        "experience": extract_experience(text),
        "batch": extract_batch(text),
        "text": text
    }