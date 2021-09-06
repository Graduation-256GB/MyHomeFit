import React, { useState, useEffect } from 'react';
import '../css/MakeYourSetForm/MakeYourSetForm.css';
import IconSet from '../images/icon_makeyourset.png';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import SetListBlock from '../components/MakeYourSetForm/SetListBlock';
import ExerciseList from '../components/MakeYourSetForm/ExerciseList';
import SetForm from '../components/MakeYourSetForm/SetForm';

import { useAsync } from "react-async"



const loadExerciseList = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/exercise/')
    if (!res.ok) throw new Error(res)
    return res.json()
}

const MakeYourSetForm = () => {
    const { data, error, isLoading } = useAsync({ promiseFn: loadExerciseList })
    const exerciseArr = [];
    const [formArr, setFormarr] = useState(["Squat"]);

    const leftArrowClick = e => {
    }
    const rightArrowClick = e => {
    }
    const addList = e => {
        const exerciseTitle = e.target.getAttribute('value');
        setFormarr(formArr.concat(exerciseTitle));
    }
    const removeList = e => {
        const exerciseTitle = e.target.getAttribute('value');
        setFormarr(formArr.filter(exercise => exercise !== exerciseTitle));
    }
    // if (isLoading) return "Loading..."
    // if (error) return `Something went wrong: ${error.message}`
    if (data) {
        
        Object.keys(data).forEach(function (key) {
            exerciseArr.push(data[key]);
        });
    }
    return (
        <div className="content">
            <div className="menu1-wrapper">
                <div className="form-menu-container">
                    <div className="menu1-title">
                        <div>
                            <h5>Only for you, Gaok</h5>
                            <img src={IconSet} />
                        </div>
                        <svg width="100" height="100">
                            <circle cx="50" cy="50" r="50" fill="white"></circle>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="content-form">
                <h2>First Step : Make Your Fitness Set.</h2>
                <SetForm />
            </div>
            <div className="content-list">
                <h2>Second Step : Choose Exercises.</h2>
                <div className="list-wrapper">
                    <div className="left-arrow" name="left-arrow" onClick={ leftArrowClick }>
                    <FiChevronLeft/>
                    </div>
                    <div className="exercise-set-list">
                        {
                            formArr.map(item => (
                                <SetListBlock picture={item} count={'5'} removeList={removeList }/>
                            ))
                        }
                    </div>
                    <div className="right-arrow" name="right-arrow" onClick={ rightArrowClick }>
                    <FiChevronRight />
                    </div>
                </div>
                <ExerciseList exerciseArr={ exerciseArr } addList={addList} />
                <button className="form-submit">Make Set</button>
            </div>
        </div>
    );

};

export default MakeYourSetForm;