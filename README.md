# Title

A professional **Full-Stack Retrieval-Augmented Generation (RAG)** application designed for high-performance document intelligence. This project demonstrates a production-ready pipeline including automated document ingestion, vector search, and a responsive React interface.

## Quick Start (Docker)

Get the entire stack (Frontend, Backend, and Networking) running with one command. You do **not** need to install Python or Node.js locally.

1. **Clone the repo:**
```bash
git clone [https://github.com/yourusername/rag-stack-enterprise.git](https://github.com/yourusername/rag-stack-enterprise.git)
cd rag-stack-enterprise
```

2. **Setup Environment Variables:
Create a .env file in the root, or separate .env files in /backend and /frontend as follows:

Backend (backend/.env):

```plaintext
OPENAI_API_KEY=your_openai_key
PINECONE_API_KEY=your_pinecone_key
PINECONE_ENVIRONMENT=your_environment
PINECONE_INDEX_NAME=your_index_name
```

Frontend (frontend/.env):

```plaintext
VITE_API_URL=http://localhost:8000
```

3. **Launch with Docker Compose:

```bash
docker compose up --build
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/docs

** Architecture & Stack
- Frontend: React (Vite) with a custom Dark Mode UI.

- Backend: FastAPI for high-performance, asynchronous document processing.

- Vector Database: Pinecone for managed, scalable similarity search.

- LLM: OpenAI GPT-4o for intelligent response synthesis.

- Orchestration: Docker & Docker Compose for consistent environment parity.
