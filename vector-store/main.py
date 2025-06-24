from typing import List
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

class UserProfileData(BaseModel):
    userId: str
    postIds: List[str]

chromadb_client = chromadb.PersistentClient(path="./db")
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

post_collection = chromadb_client.get_or_create_collection(name="post")
user_profile_collection = chromadb_client.get_or_create_collection(name="user_profile")

@app.put("/users")
def update_user(data: UserProfileData):
    #later receive in batches
    print("user", user_profile_collection.get(include=["embeddings"]))
    posts = post_collection.get(ids=data.postIds, include=["embeddings"])
    if len(posts["ids"]) == 0:
        return
    print("the posts", posts)
    
    embeddings = posts.get("embeddings", [])
    #to perform mean value need to use np
    embedding_array = np.array(embeddings)
    docs_embedding = np.mean(embedding_array, axis=0).tolist()
    print("user emb", docs_embedding)
    user_profile_collection.upsert(
        embeddings = [docs_embedding],
        ids = [data.userId],
    )

    #numpy int cant be serialized by json
    print("user vector stored")
    return {"messsage":"user vector stored"}


@app.post("/posts")
def store_post(data: StoreData):
    #later receive in batches

    document = data.title + data.preview
    #transformer model return numpy array need to convert to list
    
    docs_embedding = embedding_model.encode(document).tolist()
    response = post_collection.add(
        embeddings=[docs_embedding],
        #documents is needed
        ids = [data.id],
    )

    #numpy int cant be serialized by json
    return {"messsage":response}

@app.get("/posts/related")
def related_posts(postId: str):
    post_embedding = post_collection.get(ids=[postId])
    result = post_collection.query(
        query_embeddings=[post_embedding],
        n_results = 6
    )
    
    #numpy int cant be serialized by json
    return result["ids"][0]

@app.get("/posts/semantic_search")
def semantic_search(query: str, page_size: int = 5 ):
    query_embedding = embedding_model.encode(query)

    result = post_collection.query(
        query_embeddings=[query_embedding],
        n_results = page_size,
    )
    #numpy int cant be serialized by json
    print(result)
    return result["ids"][0]


@app.get("/users/{userId}/posts/feed")
def user_feed(userId, page_size: int = 100):

    user_embedding = user_profile_collection.get(ids=[userId], include=["embeddings"])
    embedding = user_embedding.get("embeddings", [])
    print("user_embedding", embedding)
    #embedding return the list
    result = post_collection.query(
        query_embeddings=embedding,
        n_results = page_size,
    )
    #numpy int cant be serialized by json
    return result["ids"][0]
