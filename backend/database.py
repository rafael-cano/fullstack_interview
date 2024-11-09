from pymongo import MongoClient
from datetime import datetime
import os


MONGO_URL = os.getenv('MONGO_URL', 'mongodb://mongo:27017/')
client = MongoClient(MONGO_URL)
db = client['mydatabase'] 
search_history_collection = db['search_history'] 

def save_search_history(movieName, response_data, user):
    entry = {
        'movieName': movieName,
        'result': response_data,
        'user': user,
        'timestamp': datetime.now()
    }
    search_history_collection.insert_one(entry)

def get_search_history():
    history = list(search_history_collection.find({}))
    for item in history:
        item['id'] = str(item.pop('_id'))
    return history