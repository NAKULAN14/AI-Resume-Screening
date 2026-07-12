import fitz
import os

def extract_text(pdf):

    if isinstance(pdf, str):
        doc = fitz.open(pdf)
    else:
        pdf_bytes = pdf.read()
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        pdf.seek(0)

    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()

    return text