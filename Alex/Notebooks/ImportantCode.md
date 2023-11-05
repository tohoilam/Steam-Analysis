# Important Code

## Get all NULL and NaN values

```
import pyspark.sql.functions as F

playerTypeData.select([F.count(F.when(F.isnull(c), c)).alias(c) for c in playerTypeData.columns]).show()

playerTypeData.select([F.count(F.when(F.isnan(c), c)).alias(c) for c in playerTypeData.columns]).show()
```


# Notes:

- steam_reviews dataset have 314 unique games (after cleaned)
- Combine with Mia's steam_games have 282 unique games
    - We only lost 32 games