from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embedding(text):
    return model.encode(text)


def calculate_similarity(resume_embedding, jd_embedding):
    similarity = cosine_similarity(
        [resume_embedding],
        [jd_embedding]
    )

    return similarity.item()


def calculate_skill_score(resume_skills, jd_skills):
    if len(jd_skills) == 0:
        return 100

    matched = 0

    resume_skills = [skill.lower() for skill in resume_skills]
    jd_skills = [skill.lower() for skill in jd_skills]

    for skill in jd_skills:
        if skill in resume_skills:
            matched += 1

    return (matched / len(jd_skills)) * 100


def calculate_education_score(resume_degree, jd_degree):
    if jd_degree == "Not Specified":
        return 100

    if resume_degree.lower() == jd_degree.lower():
        return 100

    return 0


def calculate_experience_score(resume_experience, jd_experience):
    if jd_experience == "Not Specified":
        return 100

    if resume_experience == jd_experience:
        return 100

    return 50


def calculate_eligibility_score(resume_batch, jd_batch):
    if jd_batch == "Not Specified":
        return 100

    if resume_batch == jd_batch:
        return 100

    return 0


def calculate_final_score(
    similarity,
    skill_score,
    education_score,
    experience_score,
    eligibility_score
):
    similarity = similarity * 100

    final_score = (
        similarity * 0.30
        + skill_score * 0.35
        + education_score * 0.05
        + experience_score * 0.15
        + eligibility_score * 0.15
    )

    return round(final_score, 2)


def rank_candidates(job_description_text, parsed_resumes, parsed_jd):
    jd_embedding = generate_embedding(job_description_text)

    ranked_candidates = []

    for resume in parsed_resumes:
        resume_embedding = generate_embedding(resume["text"])

        similarity = calculate_similarity(resume_embedding,jd_embedding)

        skill_score = calculate_skill_score(resume["skills"],parsed_jd["skills"])

        education_score = calculate_education_score(resume["education"],parsed_jd["degree"])

        experience_score = calculate_experience_score(resume["experience"],parsed_jd["experience"])

        eligibility_score = calculate_eligibility_score(resume["batch"],parsed_jd["batch"])

        final_score = calculate_final_score(similarity,skill_score,education_score,experience_score,eligibility_score)

        resume["similarity_score"] = round(similarity * 100, 2)
        resume["skill_score"] = round(skill_score, 2)
        resume["education_score"] = education_score
        resume["experience_score"] = experience_score
        resume["eligibility_score"] = eligibility_score
        resume["final_score"] = final_score

        ranked_candidates.append(resume)

    ranked_candidates = sorted(ranked_candidates,key=lambda candidate: candidate["final_score"],reverse=True)

    return ranked_candidates