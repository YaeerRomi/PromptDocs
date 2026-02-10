import os
from dotenv import load_dotenv

from pinecone import Pinecone
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate


load_dotenv()

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

index_name = "rag-stack"
index = pc.Index(index_name)

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

def process_pdf(path: str):
    """
    This function is designed to process a PDF file located at the specified path.
    
    :param path: The `process_pdf` function takes a single parameter `path`, which is a string
    representing the file path to a PDF file that you want to process
    :type path: str
    """

    loader = PyPDFLoader(path)
    docs = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )

    chunks = text_splitter.split_documents(docs)

    vectorstore = PineconeVectorStore.from_documents(
        documents=chunks, 
        embedding=embeddings, 
        index_name=index_name
    )
    return vectorstore

def get_response(query: str):
    vectorstore = PineconeVectorStore(
        embedding=embeddings, 
        index_name=index_name
    )

    retriever  = vectorstore.as_retriever(search_kwargs={"k": 3})

    # Initialize the LLM
    llm = ChatOpenAI(model="gpt-4o", temperature=0)

    template = """
    You are a helpful assistant. Use the following pieces of retrieved context 
    to answer the question. If you don't know the answer, just say that you 
    don't know, don't try to make up an answer.

    Context: {context}

    Question: {question}
    """

    prompt = ChatPromptTemplate.from_template(template)

    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    return chain.invoke(query)



    