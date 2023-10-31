import sys
assert sys.version_info >= (3, 5) # make sure we have Python 3.5+
from pyspark.sql import SparkSession, types
import pyspark.sql.functions as F
from  pyspark.sql.functions import col
data_filepath = "../data/steam_reviews.csv"

steam_reviews_schema = types.StructType([
    types.StructField('_c0', types.StringType()),
    types.StructField('app_id', types.StringType()),
    types.StructField('app_name', types.StringType()),
    types.StructField('review_id', types.StringType()),
    types.StructField('language', types.StringType()),
    types.StructField('review', types.StringType()),
    types.StructField('timestamp_created', types.StringType()),
    types.StructField('timestamp_updated', types.StringType()),
    types.StructField('recommended', types.BooleanType()),
    types.StructField('votes_helpful', types.IntegerType()),
    types.StructField('votes_funny', types.IntegerType()),
    types.StructField('weighted_vote_score', types.FloatType()),
    types.StructField('comment_count', types.IntegerType()),
    types.StructField('steam_purchase', types.BooleanType()),
    types.StructField('received_for_free', types.BooleanType()),
    types.StructField('written_during_early_access', types.BooleanType()),
    types.StructField('author.steamid', types.StringType()),
    types.StructField('author.num_games_owned', types.IntegerType()),
    types.StructField('author.num_reviews', types.IntegerType()),
    types.StructField('author.playtime_forever', types.FloatType()),
    types.StructField('author.playtime_last_two_weeks', types.FloatType()),
    types.StructField('author.playtime_at_review', types.FloatType()),
    types.StructField('author.last_played', types.FloatType()),
])


def main(inputs, output):

    steam_reviews = spark.read.format('csv').schema(steam_reviews_schema).option('header', 'true').load(inputs)

    originalSize = steam_reviews.count()

    steam_reviews = steam_reviews.where(col("app_id").isNotNull() \
                                        & col("app_name").isNotNull() \
                                        & (col("app_id") != "0") \
                                        & (col("app_name") != "0") \
                                        & (col("app_name").cast("int").isNull()) \
                                        & (col("app_id").cast("int").isNotNull()) \
                                        & (col("app_id").cast("int") != 0)  )

    steam_reviews = steam_reviews.withColumnRenamed("author.steamid", "author_steamid") \
                                .withColumnRenamed("author.num_games_owned", "author_num_games_owned") \
                                .withColumnRenamed("author.num_reviews", "author_num_reviews") \
                                .withColumnRenamed("author.playtime_forever", "author_playtime_forever") \
                                .withColumnRenamed("author.playtime_last_two_weeks", "author_playtime_last_two_weeks") \
                                .withColumnRenamed("author.playtime_at_review", "author_playtime_at_review") \
                                .withColumnRenamed("author.last_played", "author_last_played")

    steam_reviews = steam_reviews.drop("_c0")

    all_games = steam_reviews.select(col("app_id"), col("review_id")) \
                            .groupBy(col("app_id")).agg(F.count("review_id").alias("review_count")) \
                            .where(col("review_count") >= 500) \
                            .select("app_id")

    steam_reviews = steam_reviews.join(all_games.hint("broadcast"), ["app_id"])

    currentSize = steam_reviews.count()
    gameCount = all_games.count()

    print("Number of reviews:")
    print("  Original data size:", originalSize)
    print("  Current data size:", currentSize)
    print("  Data Removed:", originalSize - currentSize)
    print("")
    print("Number of games:", gameCount)
    print("")

    steam_reviews.show(100)

    steam_reviews.write.csv(output, mode='overwrite')



if __name__ == '__main__':
    inputs = sys.argv[1]
    output = sys.argv[2]
    spark = SparkSession.builder.appName('weather ETL S3 select').getOrCreate()
    assert spark.version >= '3.0' # make sure we have Spark 3.0+
    spark.sparkContext.setLogLevel('WARN')
    sc = spark.sparkContext
    main(inputs, output)