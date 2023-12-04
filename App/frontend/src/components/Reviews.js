import React, { useState, useEffect } from 'react'
import './Reviews.css'



function Reviews() {
    const [reviewsData, setReviewsData] = useState({});
    const steam_id = "289070";

    useEffect(() => {
        fetch(`/${steam_id}/reviews`).then(
            res => res.json()
        ).then(
            data => {
                setReviewsData(data);
            }
        )
    }, [])

    return (
        <section className="reviews_section">
            <h2>Keywords extracted from Reviews</h2>

            {
                (reviewsData != {})
                ? (reviewsData.keywords) 
                    ? <div className="keyword_box">
                            {
                                reviewsData.keywords?.map((keyword) => {
                                    return (
                                        <span className="keyword">{keyword}</span>
                                    )
                                })
                            }
                        </div>
                    : <div className="loading">Loading..</div>
                : <div className="loading">Loading...</div>
            }

            <h2>Reviews</h2>

            {
                (reviewsData != {})
                ? (reviewsData.reviews) 
                    ? <table className='reviews_table'>
                        <col className="col1" />
                        <col className="col2" />
                        <col className="col3" />
                        <col className="col4" />
                        <thead>
                            <tr>
                                <th>Reviews</th>
                                <th>Sentiment</th>
                                <th>Votes Helpful</th>
                                <th>Playtime at Review</th>
                            </tr>
                        </thead>
                        <tbody>

                        {
                            reviewsData.reviews?.map((reviews) => {
                                return (
                                    <tr>
                                        <td>{reviews.review}</td>
                                        <td>{reviews.sentiment} ({reviews.sentiment_score}%)</td>
                                        <td>{reviews.votes_helpful}</td>
                                        <td>{reviews.playtime_at_review} hours</td>
                                    </tr>
                                )
                            })
                        }
        
                        </tbody>
                    </table>
                    : <div className="loading">Loading..</div>
                : <div className="loading">Loading...</div>
            }
        </section>
  )
}

export default Reviews