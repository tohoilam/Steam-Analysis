import React, { useState, useEffect } from 'react'
import Reviews from './components/Reviews.js'
import Recommendation from './components/Recommendation.js'
import './App.css'

function App() {

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Reviews');
    const steam_id = "289070";

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        console.log('fetching');
        fetch(`/load`).then(
            res => res.json()
        ).then(
            data => {
                console.log(data);
                if (data.status === 'OK') {
                    console.log(data);
                    setLoading(false);
                }
            }
        )
    }, []);

    useEffect(() => {

    }, [loading]);

    return (
        <div className='main'>
            <div className='header'>
                <h1>Steam Game Analysis (Sid Meier's Civilization VI)</h1>
            </div>
            <div className="nav">
                <div
                    className={`tab-button ${activeTab === 'Reviews' ? 'active' : ''}`}
                    activeClassName="active"
                    onClick={() => handleTabClick('Reviews')}
                >
                Reviews
                </div>
                <div
                    className={`tab-button ${activeTab === 'Recommendation' ? 'active' : ''}`}
                    activeClassName="active"
                    onClick={() => handleTabClick('Recommendation')}
                >
                Game Recommendation
                </div>
            </div>
            <div className="content">
                {
                    (loading)
                    ? <div className="loading">Loading...</div>
                    : (activeTab === 'Reviews')
                        ? <Reviews/>
                        : <Recommendation/>
                }
            </div>
        </div>
        
    )
}

export default App