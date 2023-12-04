# Steam Game Analysis

## Project Overview

### 1. Project Purposes:
- **Game Development Insights**: Analyzing Steam reviews helps game companies pinpoint areas for improvement and align game development with player expectations, thereby enhancing overall game quality.
- **Marketing Strategy Optimization**: Review data analysis is vital for refining marketing efforts and investment decisions to match player preferences and current market trends.
- **Informed Gaming Choices**: Gamers gain valuable insights from these reviews, assisting them in making well-informed game purchase decisions by understanding a game's strengths and potential issues.

### 2. Project Challenges:
- **Large Data Volume**: The sheer amount of Steam reviews presents a significant challenge in terms of processing and analysis.
- **Data Quality and Relevance**: Sifting through the vast, varied feedback to filter out irrelevant or low-quality reviews requires considerable effort and time.
- **Review Bias and Subjectivity**: Given their personal nature, reviews can be biased and might not always represent the wider player base's opinions.
- **Evolving Game Content**: Frequent game updates can make older reviews less relevant, adding complexity to assessing current game quality.



## Explore More in Our Jupyter Notebook: Beyond the Report and Presentation

Our report and video presentation, constrained by length limitations, showcase only a selection of our most intriguing plots. However, we invite you to delve into our Jupyter Notebook for a more comprehensive collection of graphs and visualizations. Each is labeled with clear, descriptive titles for easy understanding, offering a deeper insight into our analysis than what is presented in the report and video.

## Dataset Size

We leveraged three rich Kaggle datasets: the first captured 21 million reviews from 300 games in 2021, offering a deep dive into player feedback. The second broadens our view with tags and genres from over 40,000 games. And the third, the TOP10 Steam Game Reviews, sharpens our focus with sentiment scores.

**Getting the data: Acquiring/gathering/downloading:**

Downloaded datasets from Kaggle.com

- [Steam Reviews Datasets of 2021](https://www.kaggle.com/datasets/najzeko/steam-reviews-2021)
- [Steam games complete dataset with popular tags and game types](https://tinyurl.com/steamCompleteData)
- [TOP10 Steam game reviews dataset](https://tinyurl.com/top10-steam-games)

Due to the substantial size of our dataset, exceeding 10GB post-decompression, uploading and downloading times are significantly extended. Consequently, we have opted not to host the datasets on GitHub. Instead, interested parties can **download the data via the provided links above**.

## Web App

We used **Flask, react.js, javascript, CSS, and HTML** to create a website where we have a separate dedicated website for each game so that the industry, including gamers, anyone can type the game ID in the website URL to see the specific analysis for the game that they are interested in. On the website, we have 2 tabs, where the first one, we can type game ID to show similar games ranked in an order of more similarities. There are two recommenders; one is content-based, and the other one is user-based. The second tab shows a list of reviews, and we have a sentiment classification model we trained that predicts sentiment for each review. Moreover, we have a keyword extraction model showing each game's corresponding keywords.


We employed a **Cassandra** database for data storage, using **batch statements** for efficient data record insertion. Given the extensive size of our datasets and the integration of complex models, we chose to host our website locally.

#### Deployment Limitation

An attempt to deploy on **Heroku** was hindered by memory limitations in the free version, as our dataset exceeded the available capacity. For a comprehensive understanding of our web app, we have prepared a **video presentation** which showcases a **demo**.

