import React, { useState } from 'react';
import {BiAddToQueue} from 'react-icons/bi'

import '../../css/gaok/MakeYourSet.css'
import MakeYourSetExerciseList from './MakeYourSetExerciseList';

function MakeYourSetBlocks ({setArr}) {

    const [setid, setSetId]=useState(1)   // 선택한 블럭의 set_id 저장 
    const [setTitle, setSetTitle]=useState('') // 선택한 블럭의 set 이름 저장


    const setTitleClicked = (id, title) => {
        console.log("start")
        {setSetId(id)}
        console.log("aaaaa")
        setSetTitle(title)
    }
   
    return(
        <div className='page-center-container'>
            <div className='page-block-wrapper'>
                <div className='block-container'>
                    <div id="trapezoid"></div>
                    <div id="block-wrapper">
                        <a className='page-block-selected' href="/makeyoursetform">
                            <label>세트 추가하기</label>
                            <BiAddToQueue className='page-block-icon'/>
                        </a>
                    
                        {setArr.map(item => (
                            <div className='page-block-selected' onClick={ () => setTitleClicked(item.id, item.title) }>
                                {/* {item.id} */}
                                <label>{item.title}</label>
                            </div> 
                        ))}
                    </div>
                </div>
            </div>
            <div className='page-contents-wrapper'>
                
                <div className='page-contents-set-title'>
                    <label>{setTitle}</label>
                </div>
                <div className='page-contents-set-tag'>
                    <label>세트 태그</label>
                </div>
                <div className='page-contents-set-time'>
                    <label>예상 소요 시간 : </label>
                    <label>00:00:00</label>
                </div>

                <div className='set-scroll'>

                    <MakeYourSetExerciseList setid={setid}/>

                </div>
                <a className='page-contents-btn-start' href="/training">
                    <label>START</label>
                </a>

            </div>
        </div>
    )
}

export default MakeYourSetBlocks;