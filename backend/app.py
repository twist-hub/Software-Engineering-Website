from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Set up MongoDB connection
client = MongoClient('mongodb://localhost:27017')
db = client['EventManagementWebsite'] #Make a new Database Called EventManagementWebsite
collection_users = db['Users'] #Make a new Collection called Users
collection_events = db['Events'] #Make a new Collection called Events
collection_clubs = db['Clubs'] #Make a new Collection called Clubs

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    # Fetch user from MongoDB collection
    user = collection_users.find_one({'username': username})
    if user and user['password'] == password:
        token = 'LoggedIn'
        response = {
            'token': token,
            'user': {
                'id': str(user['_id']),  # Convert ObjectId to string
                'username': user['username'],
                'rank' : user['rank']
            }
        }
        return jsonify(response), 200
    else:
        return jsonify({'error': 'Invalid Credentials'}), 401


@app.route('/api/events', methods=['GET', 'POST'])
def events():
    if request.method == 'GET':
        events = list(collection_events.find())
        for event in events:
            event['_id'] = str(event['_id'])  # Convert ObjectId to string
        return jsonify(events), 200

    if request.method == 'POST':
        event = {
            'date': request.json.get('date'),
            'time': request.json.get('time'),
            'title': request.json.get('title'),
            'description': request.json.get('description'),
            'club': request.json.get('club'),
            'venue': request.json.get('venue'),
            'showDetails': False
        }

        result = collection_events.insert_one(event)
        if result.inserted_id:
            response = {'message': 'Event added successfully'}
            return jsonify(response), 200
        else:
            response = {'message': 'Failed to add event'}
            return jsonify(response), 500

if __name__ == '__main__':
    app.run()



#Events MongoDB data 
# {
#   "_id": {
#     "$oid": "647714365b8bdab667df2e2d"
#   },
#   "date": "2023-06-15",
#   "time": "18:30",
#   "title": "Movie Night",
#   "description": "Enjoy a movie night under the stars with your friends and family.",
#   "club": "Film Club",
#   "venue": "Community Park"
# }


#Users MongoDB data

# {
#   "_id": 1,
#   "username": "admin",
#   "password": "password",
#    "rank": 0
# }