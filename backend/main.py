from fastapi import FastAPI, Form, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from engine import process_pdf, get_response
import shutil
import os

class ChatRequest(BaseModel):
    message: str
    thread_id: Optional[str] = None
    vector_index: str = "rag-stack"



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Vite's default port
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Hello! Your RAG stack API is running."}

@app.post("/upload")
async def endpoint(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    try:
        await file.seek(0)

        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)

        # Process with langchain
        process_pdf(temp_path)

        os.remove(temp_path)

        return {"message" : f"Successfully Processed {file.filename}" }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    response = get_response(request.message)


    return {"answer": response}