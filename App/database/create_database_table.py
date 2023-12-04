from cassandra.cluster import Cluster

keyspace = 'hlt2'
cluster = Cluster(['127.0.0.1'], port=9042)
session = cluster.connect(keyspace)
# rows = session.execute('SELECT * FROM test')

rows = session.execute('CREATE TABLE reviews ( game_id INT, id UUID, review TEXT, sentiment TEXT, sentiment_score FLOAT, votes_helpful INT, playtime_at_review FLOAT, PRIMARY KEY (game_id, id) )')