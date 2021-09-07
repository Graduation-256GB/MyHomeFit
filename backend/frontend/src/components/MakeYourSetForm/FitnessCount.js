import React, { useState } from 'react';
import {AiFillCaretUp} from 'react-icons/ai'
import {AiFillCaretDown} from 'react-icons/ai'
import '../../css/MakeYourSet/FitnessCount.css';

const FitnessCount = ({ count }) => {
    // const clickCountUp = e => {
    //     setCount(parseInt(count)+1);
    // }
    // const clickCountDown = e => {
    //     setCount(count - 1);
        
    // }
    return(
        <div className="list-text">
            <AiFillCaretUp/>
            {count}회 반복
            <AiFillCaretDown/>
        </div>
    )
}
export default FitnessCount;
