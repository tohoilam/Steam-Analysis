import React, { useState, useEffect } from 'react'
import Reviews from './components/Reviews.js'
import Recommendation from './components/Recommendation.js'
import './App.css'

function App() {

    const [data, setData] = useState([{}]);
    const [activeTab, setActiveTab] = useState('Reviews');
    const steam_id = "578080";

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className='main'>
            <div className='header'>
                <h1>Steam Reviews</h1>
            </div>
            <div className="nav">
                <button
                    className={`tab-button ${activeTab === 'Reviews' ? 'active' : ''}`}
                    onClick={() => handleTabClick('Reviews')}
                >
                Reviews
                </button>
                <button
                    className={`tab-button ${activeTab === 'Recommendation' ? 'active' : ''}`}
                    onClick={() => handleTabClick('Recommendation')}
                >
                Game Recommendation
                </button>
            </div>
            <div className="content">
                {
                    (activeTab === 'Reviews')
                    ? <Reviews/>
                    : <Recommendation/>
                }
            </div>
        </div>
        
    )
}

export default App