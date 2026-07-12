import re
from data.skills import SKILLS


def extract_skills(text):
    text = text.lower()

    found_skills = []

    for skill in SKILLS:
        if skill.lower() in text:
            found_skills.append(skill)

    return sorted(list(set(found_skills)))


def extract_degree(text):

    degrees = [
        "b.tech",
        "btech",
        "b.e",
        "be",
        "m.tech",
        "mtech",
        "m.e",
        "me",
        "b.sc",
        "bsc",
        "m.sc",
        "msc",
        "bca",
        "mca",
        "phd"
    ]

    text = text.lower()

    for degree in degrees:
        if degree in text:
            return degree.upper()

    return "Not Specified"


def extract_experience(text):

    pattern = r"(\d+\s*[-+]\s*\d*\s*years|\d+\+?\s*years)"

    match = re.search(pattern, text.lower())

    if match:
        return match.group()

    return "Not Specified"


def extract_batch(text):

    pattern = r"\b20\d{2}\b"

    match = re.search(pattern, text)

    if match:
        return match.group()

    return "Not Specified"

def parse_job_description(text):
    jd = {

        "skills": extract_skills(text),

        "degree": extract_degree(text),

        "experience": extract_experience(text),

        "batch": extract_batch(text)

    }

    return jd