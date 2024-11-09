from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import save_search_history, get_search_history
import requests
import os

app = FastAPI()

origins = [
    "http://frontend",
    "http://frontend:3000",
    "http://127.0.0.1",
    "http://127.0.0.1:3000",
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# KEY = os.getenv('API_KEY')
KEY = '_BGMtc1NKQJ0a002EaDa'
URL = 'https://the-one-api.dev/v2/movie'

@app.get('/movie/')
async def get_movies(user: str, movieName: str):
    if not user:
        raise HTTPException(status_code=400, detail='User not informed')
    if not movieName:
        raise HTTPException(status_code=400, detail='Movie not informed')
    headers = {'Authorization': f'Bearer {KEY}'}
    params = {
        'name': movieName
    }
    response = requests.get(URL, headers=headers, params=params)
    print(response.json())
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail='Error retrieving data')

    movie = response.json()['docs'][0] if len(response.json()['docs']) > 0 else {}
    save_search_history(movieName, movie, user)

    return movie

@app.get('/history/')
async def get_history():
    history = get_search_history()
    return history