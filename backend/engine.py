import os
from openai import OpenAI
from dotenv import load_dotenv
from pypdf import PdfReader
from pinecone import Pinecone
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings

load_dotenv()

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

index_name = "rag-stack-enterprise"
index = pc.Index(index_name)

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

def extract_text_from_pdf(path):
    reader = PdfReader(path)
    full_text = ""

    for page in range(len(reader.pages)):
        page = reader.pages[page]
        text = page.extract_text()
        full_text += text + "\n"

    return full_text

def load_and_chunk_pdf(path: str):
    text = extract_text_from_pdf(path)

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )

    chunks = text_splitter.split_text(text)

    return chunks

def upload_to_pinecone(chunks):
    vectorstore = PineconeVectorStore.from_documents(
        documents=chunks,
        embedding=embeddings,
        index=index
    )
    return vectorstore
