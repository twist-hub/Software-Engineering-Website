from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# Set up MongoDB connection
client = MongoClient('mongodb://localhost:27017')
db = client['EventManagementWebsite']
collection_users = db['Users']
collection_events = db['Events']
collection_clubs = db['Clubs']

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    # Fetch user from MongoDB collection
    user = collection_users.find_one({'username': username})
    if user and user['password'] == password:
        token = "LoggedInDamnThatsCrazy05"
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


@app.route('/api/clubs', methods=['GET'])
def get_clubs():
    clubs = list(collection_clubs.find({}, {'_id': False}))
    return jsonify(clubs)

@app.route("/api/clubs/updateBudget/1", methods=["PUT"])
def update_budget(club_id):
    try:
        # Get the updated budget value from the request body
        updated_budget = int(request.json["budget"])

        # Update the budget in the database
        result = collection_clubs.update_one(
            {"id": ObjectId(club_id)},
            {"$set": {"budget": updated_budget}}
        )

        if result.modified_count > 0:
            return jsonify({"message": "Budget updated successfully"})
        else:
            return jsonify({"message": "Budget update failed"})

    except Exception as e:
        return jsonify({"message": str(e)}), 500
    

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