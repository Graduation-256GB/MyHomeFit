import React, { useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import { setidGetter, setidState } from '../../pages/state';

import {BiAddToQueue} from 'react-icons/bi'
import '../../css/gaok/MakeYourSet.css'
import MakeYourSetExerciseList from './MakeYourSetExerciseList';
import IconStart from '../../images/icon_start.png'

function MakeYourSetBlocks ({setArr}) {

    // 전역변수 사용
    const [globalSetid, setGlobalSetid] = useRecoilState(setidState);
    
    console.log("recoilvalue", useRecoilState(setidState))
    

    const [setid, setSetId]=useState(0)   // 선택한 블럭의 set_id 저장 
    const [setTitle, setSetTitle]=useState('') // 선택한 블럭의 set 이름 저장
    const [type, setType]=useState('') // 선택한 블럭의 set 타입 저장
    const [isSelected, setSelected]=useState('') // 블럭 선택 유무 상태 저장 

    const setTitleClicked = (id, title, type) => {
        console.log("start")
        {setSetId(id)}
        setSetTitle(title)
        setType(type)
        // setGlobalSetid(id)
        // console.log("전역변수 확인",{globalSetid})
        const setObj = { setid: id };
        window.localStorage.setItem("setid", id);
        console.log("test", window.localStorage.getItem("setid"))
        
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
                            <div className={isSelected == item.id ? 'page-block-selected' : 'page-block-unselected'}
                                onClick={() => { setTitleClicked(item.id, item.title, item.type); setSelected(item.id) }}>
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
                </div>

                <div className='set-scroll'>

                    <MakeYourSetExerciseList setid={setid}/>

                </div>

                <a className='page-contents-btn-start' href="/training">
                    <img src={IconStart}/>
                    <label>START</label>
                </a>
                
            </div>
        </div>
    )
}

export default MakeYourSetBlocks;