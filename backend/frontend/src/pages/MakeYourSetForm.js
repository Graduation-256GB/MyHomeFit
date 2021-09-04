import React from 'react';
import '../css/MakeYourSet/MakeYourSetForm.css';
import IconSet from '../images/icon_makeyourset.png';
import SendIcon from '../images/url_send.png';
import LeftBtn from '../images/menu_left.png';
import RightBtn from '../images/menu_right.png';
import ListBlock from '../components/MakeYourSet/ListBlock';

import { useAsync } from "react-async"

const loadExerciseList = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/exercise/')
    if (!res.ok) throw new Error(res)
    return res.json()
}

const MakeYourSetForm = () => {
    const { data, error, isLoading } = useAsync({ promiseFn: loadExerciseList })
    if (isLoading) return "Loading..."
    if (error) return `Something went wrong: ${error.message}`
    if (data){
        const arr = [];
    Object.keys(data).forEach(function (key) {
        arr.push(data[key]);
    });
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
            <div>
                <label>Make Your Fitness Set.</label>
                <span>Title</span>
                <input type="text"></input>
                <span>Category</span>
            </div>
            <div className="list-wrapper">
                {/* <div className="btn-left"><img src={LeftBtn}></img></div> */}
                <div className="exercise-list">
                    <ListBlock name="Squat" />
                    <ListBlock name="Squat" />
                    <ListBlock name="Squat" />
                    <ListBlock name="Squat" />
                    <ListBlock name="Squat" />
                    <ListBlock name="Squat" />
                    <ListBlock name="Squat" />
                    <ListBlock name="Squat" />
                    <ListBlock name="Squat" />
                </div>
                {/* <div className="btn-right"><img src={RightBtn}></img></div> */}
            </div>
            <div>
                {arr.map(item => (
                    <span>{ item.name}</span>
                ))}
            </div>
        </div>
    );
}
};

export default MakeYourSetForm;