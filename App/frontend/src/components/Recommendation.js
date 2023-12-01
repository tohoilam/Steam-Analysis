import React, { useState, useEffect } from 'react'
import './Recommendation.css'

function Recommendation() {

    const [steamId, setSteamId] = useState("89302");
    const [contentRecommendData, setContentRecommendData] = useState([]);
    const [collaborativeRecommendData, setCollaborativeRecommendData] = useState([]);
    const [recommended, setRecommended] = useState(false);

    const changeSteamId = (e) => {
        setSteamId(e.target.value);
    }

    const getRecommendation = () => {
        fetch(`/recommendations/${steamId}`).then(
            res => res.json()
        ).then(
            data => {
                if (data.content_recommendations) {
                    setContentRecommendData(data.content_recommendations);
                }
                if (data.collaborative_recommendations) {
                    setCollaborativeRecommendData(data.collaborative_recommendations);
                }
            }
        )
        setRecommended(true);
    }

    useEffect(() => {
        
    }, [recommended, contentRecommendData,collaborativeRecommendData])

    return (
        <section className="recommendation_section">

        <h2>Game Recommendation</h2>

        <h3>Choose a game:</h3>

        <div className="game_select_box">

            <select name="games" className="games_select" form="games" selected={steamId} onChange={(e) => {changeSteamId(e)}}>
                <option value="89302">PUBG</option>
                <option value="37289">LOL</option>
                <option value="4039">Ark</option>
                <option value="1278">CS Go</option>
            </select>

            <button className="game_select_button" onClick={getRecommendation}>Recommend</button>

        </div>

        {
            (recommended)
            ? <div>
                <h3>Recommended Games:</h3>

                <div className="recommended_games_box">

                    <div className="content_recommended_game">

                        <h4>Content-based Recommender</h4>

                        {
                            (contentRecommendData != [])
                            ? <table>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Game ID</th>
                                        <th>Game Name</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contentRecommendData?.map((game) => {
                                            return (
                                                <tr>
                                                    <td>{game.rank}.</td>
                                                    <td>{game.game_id}</td>
                                                    <td>{game.game_name}</td>
                                                    <td>{game.score} %</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            : <div className="loading">Loading...</div>
                        }

                    </div>

                    <div className="collaborative_recommended_game">

                        <h4>Collaborative Recommender</h4>

                        {
                            (collaborativeRecommendData != [])
                            ? <table>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Game ID</th>
                                        <th>Game Name</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        collaborativeRecommendData?.map((game) => {
                                            return (
                                                <tr>
                                                    <td>{game.rank}.</td>
                                                    <td>{game.game_id}</td>
                                                    <td>{game.game_name}</td>
                                                    <td>{game.score} %</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            : <div className="loading">Loading...</div>
                        }

                    </div>
                </div>
            </div>
            : ""
        }

        </section>
    )
}

export default Recommendation