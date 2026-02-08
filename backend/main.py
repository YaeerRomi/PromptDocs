from fastapi import FastAPI, Form, UploadFile, File
import shutil
import os

app = FastAPI()


@app.post("/upload")
async def endpoint(file: UploadFile = File(...)):
    try:
        # Save file locally temporarily
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Process with langchain
