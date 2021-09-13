import React, { useState } from 'react';
import {AiFillCaretUp} from 'react-icons/ai'
import {AiFillCaretDown} from 'react-icons/ai'
import '../../css/MakeYourSet/FitnessCount.css';

const FitnessCount = ({ count,clickCount,id,changeCount }) => {
    // const clickCountUp = e => {
    //     setCount(parseInt(count)+1);
    // }
    return(
        <div className="list-text">
            <AiFillCaretUp data-count="count-up" onClick={ ()=>clickCount(id,'up') }/>
            <input value={count}
                required
                type="text"
                onChange={ e=>changeCount(id,e.target.value)}/>회 반복
            <AiFillCaretDown data-count="count-down" onClick={ ()=>clickCount(id,'down') }/>
        </div>
    )
}
export default FitnessCount;
