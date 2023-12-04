from flask import Flask
import pickle
import pandas as pd
import pyarrow
import csv
from scipy.sparse import csr_matrix
import sklearn
from cassandra.cluster import Cluster

app = Flask(__name__)

# make global
cosine_sim_loaded = None
df_rec = None
mat_game_features = None
model_knn = None
hashmap = {}
game_names = {}
session = None
loaded = False


def content_recommender(game_id):
    global cosine_sim_loaded
    global df_rec

    game_index = df_rec[df_rec.game_id == game_id].index.values[0]

    # generate similar games matrix
    similar_games = list(enumerate(cosine_sim_loaded[game_index]))

    # Sorting the similar games in descending order
    sorted_similar_games = sorted(similar_games, key = lambda x:x[1], reverse = True)

    i=0
    recommended_games = []
    for games in sorted_similar_games:
        if i != 0:
            game_id = df_rec[df_rec.index == games[0]]["game_id"].values[0]
            norm_score = (games[1] + 1) / 2 * 100
            name = df_rec[df_rec.index == games[0]]["name"].values[0]
            recommended_games.append({'game_id': str(game_id), 'rank': i, 'score': round(norm_score, 1), 'game_name': name})
        i = i+1
        if i>10:
            break

    return recommended_games 

def collaborative_setup():
    global mat_game_features
    global model_knn
    global hashmap
    global game_names

    filename = "collabRecommendation.pickle"
    model_knn = pickle.load(open(filename, "rb"))

    with open('itemBasedRecommendation_hashmap.csv', mode='r') as infile:
        reader = csv.reader(infile)
        for rows in reader:
            hashmap[rows[0]] = int(rows[1])
    with open('df_game_features.pkl', mode='rb') as infile:
        df_game_features = pickle.load(infile)
    mat_game_features = csr_matrix(df_game_features.values)

    with open('review_counts.csv', mode='r') as infile:
        reader = csv.reader(infile)
        for rows in reader:
            game_names[rows[0]] = rows[1]

def collaborative_recommender(game_id):
    global mat_game_features
    global model_knn
    global hashmap
    global game_names

    n_recommendations = 10

    distances, indices = model_knn.kneighbors(
        mat_game_features[hashmap[game_id]],
        n_neighbors=n_recommendations+1)
    # get list of raw idx of recommendations
    raw_recommends = \
        sorted(
            list(
                zip(
                    indices.squeeze().tolist(),
                    distances.squeeze().tolist()
                )
            ),
            key=lambda x: x[1]
        )[:0:-1]

    reverse_hashmap = {v: k for k, v in hashmap.items()}
    recommended_games = []
    for i, (idx, dist) in enumerate(raw_recommends):
        recommend_game_id = str(reverse_hashmap[idx])
        recommended_games.append({'game_id': recommend_game_id, 'rank': i+1, 'score': round(dist*10000 - 9900, 1), 'game_name': game_names[recommend_game_id]})
    
    return recommended_games


@app.route("/load")
def landing():
    global loaded
    global session

    if not loaded:
        with open('cosine_sim.pkl', 'rb') as file:
            global cosine_sim_loaded
            cosine_sim_loaded = pickle.load(file)

        global df_rec
        df_rec = pd.read_parquet('df_rec.parquet', engine='pyarrow') 

        collaborative_setup()

        keyspace = 'hlt2'
        cluster = Cluster(['127.0.0.1'], port=9042)
        session = cluster.connect(keyspace)

        return {"status": "OK", "message": "Loaded"}
    else:
        return {"status": "OK", "message": "Previously Loaded"}




@app.route("/<game_id>/reviews")
def getReviews(game_id):
    global session

    rows = session.execute('SELECT * FROM reviews WHERE game_id = ' + game_id + ';')

    reviews = []
    for index, row in enumerate(rows):
        reviews.append({
                        "review": row.review,
                        "sentiment": row.sentiment,
                        "sentiment_score": round(row.sentiment_score, 1),
                        "votes_helpful": row.votes_helpful,
                        "playtime_at_review": round(row.playtime_at_review, 1)
                    })
    return {"reviews": reviews,
            "keywords": ["Civ", "Addictive", "Unresponsive", "Immensive", "Civ4", "AI", "DLC", "Bugs", "Pack", "Blurry", "Online", "Story", "Repetitive", "Civ6", "Strategy", "Builder", "Word", "Bug", "Engine", "Civilization", "Crashing", "Graphics", "Recommended", "Expansions", "Different", "Complex", "Platinum"],
            "game_id": game_id}

@app.route("/recommendations/<game_id>")
def getRecommendations(game_id):

    content_recommended = content_recommender(int(game_id))
    collaborative_recommended = collaborative_recommender(game_id)

    return {
        "content_recommendations": content_recommended,
        "collaborative_recommendations": collaborative_recommended,
        "game_id": game_id
    }


    # return {
    #     "content_recommendations": [{'game_id': 73829, 'rank': 1, 'score': 0.87,  'game_name': 'fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss '}, {'game_id': 73829, 'rank': 2, 'score': 0.87,  'game_name': 'jkjjlks'}, {'game_id': 73829, 'rank': 3, 'score': 0.87,  'game_name': 'jkjjlks'}],
    #     "collaborative_recommendations": [{'game_id': 73829, 'rank': 1, 'score': 0.87,  'game_name': 'jkjjlks'}, {'game_id': 73829, 'rank': 2, 'score': 0.87,  'game_name': 'jkjjlks'}, {'game_id': 73829, 'rank': 3, 'score': 0.87,  'game_name': 'fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss fjkss '}],
    #     "game_id": game_id
    # }

if __name__ == '__main__':
    app.run(debug=True)
