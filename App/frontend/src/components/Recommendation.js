import React, { useState, useEffect } from 'react'
import './Recommendation.css'
import $ from 'jquery'

function Recommendation() {
    const id_name_pair = require('./game_id_pair.json');
    const [steamId, setSteamId] = useState("289070");
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
                console.log(data)
            }
        )
        setRecommended(true);
    }

    useEffect(() => {

    }, [recommended, contentRecommendData,collaborativeRecommendData])

    useEffect(() => {
        // loadGameList();
        // const id_pair = require('./game_id_pair.json');
        console.log(id_name_pair);
        // $.getJSON("game_id_pair.json", function(json) {
        //     console.log(json); // this will show the info it in firebug console
        //     setLoaded(true);
        // });
    }, [])

    return (
        <section className="recommendation_section">

        <h2>Game Recommendation</h2>

        <h3>Choose a game:</h3>

        <div className="game_select_box">

            <select name="games" className="games_select" form="games" selected={steamId} onChange={(e) => {changeSteamId(e)}}>
                {
                    id_name_pair.map((pair) => {
                        return (
                            <option value={pair['game_id']}>{pair['game_name']}</option>
                        )
                    })
                }
            </select>

            <button className="game_select_button" onClick={getRecommendation}>Recommend</button>

        </div>

        {
            (recommended)
            ? <div>
                <h3 className="recommended_game_title">Recommended Games:</h3>

                <div className="recommended_games_box">

                    <div className="content_recommended_game">

                        <h4>Content-based Recommender</h4>

                        {
                            (contentRecommendData != [])
                            ? <table>
                                <col className="col1" />
                                <col className="col2" />
                                <col className="col3" />
                                <col className="col4" />
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
                                <col className="col1" />
                                <col className="col2" />
                                <col className="col3" />
                                <col className="col4" />
                                <thead></thead>
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