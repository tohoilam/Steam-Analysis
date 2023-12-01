from flask import Flask

app = Flask(__name__)


@app.route("/<game_id>/reviews")
def getReviews(game_id):
    return {"reviews": [
                {
                    "review": "This game is great!",
                    "sentiment": "Positive",
                    "sentiment_score": 87.2,
                    "votes_helpful": 18,
                    "playtime_at_review": 34.3
                },
                {
                    "review": "A good review includes enough detail to give others a feel for what happened. Explain which factors contributed to your positive, negative or just so-so experience. You might also offer your view on what the company is doing well, and how they can improve. But keep things friendly and courteous!",
                    "sentiment": "Negative",
                    "sentiment_score": 92.2,
                    "votes_helpful": 9,
                    "playtime_at_review": 25.2
                },
                                {
                    "review": "This game is great!",
                    "sentiment": "Positive",
                    "sentiment_score": 87.2,
                    "votes_helpful": 18,
                    "playtime_at_review": 34.3
                },
                {
                    "review": "A good review includes enough detail to give others a feel for what happened. Explain which factors contributed to your positive, negative or just so-so experience. You might also offer your view on what the company is doing well, and how they can improve. But keep things friendly and courteous!",
                    "sentiment": "Negative",
                    "sentiment_score": 92.2,
                    "votes_helpful": 9,
                    "playtime_at_review": 25.2
                }
            ],
            "keywords": ["Fun", "Strange", "Weird"],
            "game_id": game_id}

@app.route("/recommendations/<game_id>")
def getRecommendations(game_id):

    return {
        "content_recommendations": [{'game_id': 73829, 'rank': 1, 'score': 0.87,  'game_name': 'jkjjlks'}, {'game_id': 73829, 'rank': 2, 'score': 0.87,  'game_name': 'jkjjlks'}, {'game_id': 73829, 'rank': 3, 'score': 0.87,  'game_name': 'jkjjlks'}],
        "collaborative_recommendations": [{'game_id': 73829, 'rank': 1, 'score': 0.87,  'game_name': 'jkjjlks'}, {'game_id': 73829, 'rank': 2, 'score': 0.87,  'game_name': 'jkjjlks'}, {'game_id': 73829, 'rank': 3, 'score': 0.87,  'game_name': 'jkjjlks'}],
        "game_id": game_id
    }

if __name__ == '__main__':
    app.run(debug=True)
