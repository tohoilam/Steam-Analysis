# Steam Reviews ETL Guide

## Run the following with your data directory

### Partition by game_id (default True)

```spark-submit steam_reviews_etl.py ../data/steam_reviews.csv ../data/cleaned_steam_reviews```

### Partition 100

```spark-submit steam_reviews_etl.py ../data/steam_reviews.csv ../data/cleaned_steam_reviews False```