import React, { useState } from 'react';
import {BiAddToQueue} from 'react-icons/bi'

import '../../css/gaok/MakeYourSet.css'
import MakeYourSetExerciseList from './MakeYourSetExerciseList';
import IconStart from '../../images/icon_start.png'

function MakeYourSetBlocks ({setArr}) {

    const [setid, setSetId]=useState(1)   // 선택한 블럭의 set_id 저장 
    const [setTitle, setSetTitle]=useState('') // 선택한 블럭의 set 이름 저장
    const [type, setType]=useState('') // 선택한 블럭의 set 타입 저장
    const [isSelected, setSelected]=useState('') // 블럭 선택 유무 상태 저장 

    const addSet = e => {
        window.location.replace('http://127.0.0.1:8000/makeyoursetform');
    }

    const startSet = (id) => {
        window.location.replace('http://127.0.0.1:8000/training');
    }

    const setTitleClicked = (id, title, type) => {
        console.log("start")
        {setSetId(id)}
        console.log("aaaaa")
        setSetTitle(title)
        setType(type)
    }

    return(
        <div className='page-center-container'>
            <div className='page-block-wrapper'>
                <div className='block-container'>
                    <div id="trapezoid"></div>
                    <div id="block-wrapper">
                        <div className='page-block-selected' onClick={ addSet }>
                            <label>세트 추가하기</label>
                            <BiAddToQueue className='page-block-icon'/>
                        </div>
                    
                        {setArr.map(item => (
                            <div className={isSelected==item.id?'page-block-selected':'page-block-unselected'} onClick={ () => {setTitleClicked(item.id, item.title, item.type); setSelected(item.id)}  }>
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
                    <label># {type}</label>
                </div>
                <div className='page-contents-set-time'>
                    {/* <label>예상 소요 시간 : </label>
                    <label>00:00:00</label> */}
                </div>

                <div className='set-scroll'>

                    <MakeYourSetExerciseList setid={setid}/>

                </div>
                <div className='page-contents-btn-start' onClick={ startSet }>
                    <img src={IconStart}/>
                    <label>START</label>
                </div>
                
            </div>
        </div>
    )
}

export default MakeYourSetBlocks;