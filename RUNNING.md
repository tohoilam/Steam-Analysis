# Running Instruction

## ETL, Data Analysis, and Machine Learning

We have included the full notebooks of each task separately in the followings:

- [Data Analysis](./Data_Analysis/)
- [ETL Cleaning](./ETL_Cleaning/)
- [Machine Learning](./MachineLearning/)
- [Application](./App/)


Due to the substantial size of our dataset, exceeding 10GB post-decompression, uploading and downloading times are significantly extended. Consequently, we have opted not to host the datasets on GitHub. Instead, interested parties can **visit our [README file](README.md) and download the data via the provided links above**.

## Web Application Local Setup

```
cd App
```

### 1. Create Cassandra Table and Load Data

**NOTE: This step requires to download the full dataset from kaggle, [Steam Reviews Datasets of 2021](https://www.kaggle.com/datasets/najzeko/steam-reviews-2021)**

#### a. Create Table

```
cd database
python3 create_database_table.py
```

#### b. Load Data

```
python3 load_data_to_cassandra.py
```

### 2. Initialize Backend

```
cd backend

pip install -r requirements.txt
python3 server.py
```

### 3. Initialize Frontend

```
cd frontend

npm start
```

### 4. Visit Webpage

- Go to localhost:3000 for webpage
