from cassandra.cluster import Cluster
from cassandra.query import BatchStatement
from cassandra import ConsistencyLevel
import pandas as pd
import os
import gzip
import time
import matplotlib.pyplot as plt
from pyspark.sql import SparkSession, types
import pyspark.sql.functions as F
from  pyspark.sql.functions import col

spark = (
    SparkSession.builder.config("spark.sql.debug.maxToStringFields", 100)
    .appName("reviews")
    .getOrCreate()
)

data_filepath = "../../data/cleaned_steam_reviews"

steam_reviews = spark.read.parquet(data_filepath)

reviews = steam_reviews.where(col("language") == "english") \
                        .select("app_id", "review", "votes_helpful", "author_playtime_at_review") \
                        .where(col("votes_helpful").isNotNull() & col("review").isNotNull() & col("author_playtime_at_review").isNotNull() & (col("review") != "")) \
                        .where(F.length(col("review")) > 10) \
                        .withColumn("author_playtime_at_review", F.round(col("author_playtime_at_review") / 60, 1))

game_id = 289070

reviews_289070 = reviews.where(col("app_id") == game_id).limit(1000)

# reviews_289070 to df
reviews_289070_df = reviews_289070.toPandas()

from transformers import AlbertTokenizer, AlbertForSequenceClassification
import torch
from transformers import AlbertModel
import torch.nn as nn

class SentimentClassifier(nn.Module):
    def __init__(self, n_classes):
        super(SentimentClassifier, self).__init__()
        self.albert = AlbertModel.from_pretrained('albert-base-v2')
        self.drop = nn.Dropout(p=0.3)
        self.out = nn.Linear(self.albert.config.hidden_size, n_classes)

    def forward(self, input_ids, attention_mask):
        _, pooled_output = self.albert(
            input_ids=input_ids,
            attention_mask=attention_mask,
            return_dict=False
        )
        output = self.drop(pooled_output)
        return self.out(output)

def import_data(model_file):
  n_classes = 2
  model = SentimentClassifier(n_classes)
  model.load_state_dict(torch.load(model_file, map_location=torch.device('cpu')))
  return model

def predict_class(model,review):
    model.eval()  # Put the model in evaluation mode

    # Load the tokenizer
    tokenizer = AlbertTokenizer.from_pretrained('albert-base-v2')
    text = review
    # Tokenize the example text and create attention masks
    inputs = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        max_length=128,
        padding='max_length',
        return_attention_mask=True,
        return_tensors='pt',  # Return PyTorch tensors
        truncation=True
    )

    # Get the input IDs and attention mask
    input_ids = inputs['input_ids']
    attention_mask = inputs['attention_mask']

    # Predict
    with torch.no_grad():  # No need to compute gradients for predictions
        outputs = model(input_ids, attention_mask=attention_mask)

    # The first element in the outputs is the logits
    logits = outputs[0]

    # Process the outputs
    probabilities = torch.nn.functional.softmax(logits, dim=-1)

    # Get the highest probability class
    predicted_class = torch.argmax(probabilities, dim=-1).numpy()

    # first element of pytorch tensor in float
    probabilities = probabilities.numpy().tolist()
    return (round(max(probabilities)*100, 1), "Positive" if predicted_class == 1 else "Negative")


model = import_data("albert_model.pth")

keyspace = 'hlt2'
cluster = Cluster(['127.0.0.1'], port=9042)
session = cluster.connect(keyspace)
# rows = session.execute('SELECT * FROM test')

insert_statement = session.prepare(f" INSERT INTO reviews (game_id, id, review, sentiment, sentiment_score, votes_helpful, playtime_at_review) VALUES (?, uuid(), ?, ?, ?, ?, ?);")
# ( game_id INT, id UUID, review TEXT, sentiment TEXT, sentiment_score FLOAT, votes_helpful INT, playtime_at_review FLOAT

batch = BatchStatement(consistency_level=ConsistencyLevel.ONE)
count = 0

for index, row in reviews_289070_df.iterrows():
    sentiment_score, sentiment = predict_class(model, row["review"])
    batch.add(insert_statement, (game_id, row["review"], sentiment, sentiment_score, row["votes_helpful"], row["author_playtime_at_review"]))
    count += 1

    if (count == 200):
        session.execute(batch)
        batch.clear()
        count = 0

if (count > 0):
    session.execute(batch)
    batch.clear()