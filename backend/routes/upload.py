from fastapi import APIRouter, UploadFile,File
import shutil
import os
from services.pdf_reader import extract_text
router=APIRouter()
UPLOAD_FOLDER= "uploads"
os.makedirs(UPLOAD_FOLDER,exist_ok=True)
@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    file_path=os.path.join(UPLOAD_FOLDER,file.filename)
    
    with open(file_path,"wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    text = extract_text(file_path)
    print(text)
    return{
        "message": "Resume uploaded successfully!",
        "filename": file.filename
           }

    