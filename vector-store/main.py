from fastapi import FastAPI
from sentence_transformers import SentenceTransformer
import chromadb
import numpy as np
from pydantic import BaseModel
#cant use langchain models directly with chroma due to diff in api
#can use .from_documents() which auto manage ids...
app = FastAPI()

class StoreData(BaseModel):
    id: str
    title: str
    preview: str

chromadb_client = chromadb.PersistentClient(path="./db")
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

collection = chromadb_client.get_or_create_collection("post")

@app.post("/store")
def store(data: StoreData):
    #later receive in batches
    print("received", data)

    document = data.title + data.preview
    docs_embedding = embedding_model.encode(document)

    collection.add(
        documents = [docs_embedding],
        id = [data.id],
    )
    #numpy int cant be serialized by json
    return {"messsage":"sucessful"}

@app.get("/semantic_search")
def semantic_search(query: str, page_size: int = 5 ):
    
    query_embedding = embedding_model.encode(query)

    result = collection.query(
        query_embedding=[query_embedding],
        n_results = page_size,
    )
    print("before return", result)
    #numpy int cant be serialized by json
    return result
    
    
