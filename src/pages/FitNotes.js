import React from 'react';
import "../css/FitNotes/FitNotes.css"
import IconFitnotes from "../images/icon_fitnotes.png"
import FitnessRank from "../components/FitNotes/FitnessRank";
import RecommendFitness from "../components/FitNotes/RecommendFitness";
import FitnessCalories from "../components/FitNotes/FitnessCalories";

const FitNotes = () => {
    return (
        <div className="menu3-container">
            <div className="menu3-title">
                <div>
                    <h5>Welcome, Gaok</h5>
                    <img src={IconFitnotes}/>
                </div>
                <svg width="100" height="100">
                    <circle cx="50" cy="50" r="50" fill="white"></circle>
                </svg>
            </div>
            <div className="menu3-small-title">
                <label>Hi Gaok, This is your FitNotes.</label>
            </div>

            <div className="fitnotes-fitness-container">
                <div>
                    <FitnessRank name="Top"/>
                    <FitnessCalories/>
                </div>
                <div className="recommend-container">
                    <RecommendFitness name="Gaok"/>
                </div>

                <div className="recommend-container">
                    <RecommendFitness name="Gaok"/>
                </div>
                <div className="recommend-container">
                    <RecommendFitness name="Gaok"/>
                </div>
                <div className="recommend-container">
                    <RecommendFitness name="Gaok"/>
                </div>

            </div>
        </div>
    );
};

export default FitNotes;