import React, { useState } from 'react';
import {AiFillCaretUp} from 'react-icons/ai'
import {AiFillCaretDown} from 'react-icons/ai'
import '../../css/MakeYourSet/FitnessCount.css';

const FitnessCount = ({ count,clickCount,id }) => {
    // const clickCountUp = e => {
    //     setCount(parseInt(count)+1);
    // }
    return(
        <div className="list-text">
            <AiFillCaretUp onClick={ ()=>clickCount(id) }/>
            {count}회 반복
            <AiFillCaretDown onClick={ ()=>clickCount(id) }/>
        </div>
    )
}
export default FitnessCount;
