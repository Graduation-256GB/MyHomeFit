import React, { useState } from 'react';
import { useMediaQuery } from "react-responsive";
import {BiAddToQueue} from 'react-icons/bi'

// import MakeYourSetMainSet from '../makeyourset/MakeYourSetMainSet'
import '../../css/gaok/MakeYourSet.css'
import IconSet from '../../images/icon_makeyourset.png';
import IconAddSet from '../../images/icon_add_set.png'
import IconStart from '../../images/icon_start.png'
import IconListSquat from '../../images/icon_set_squat.png'

  
import { useAsync } from "react-async"
import MakeYourSetExerciseList from './MakeYourSetExerciseList';

const loadSetInExerciseList = async () => {
    const Token = localStorage.getItem('token')
    const res = await fetch('http://127.0.0.1:8000/api/set/exercise/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${Token}`
        }
    })
    if (!res.ok) throw new Error(res)
    return res.json() 
}

function MakeYourSetBlocks2 ({setArr}) {
    const isDesktopOrLaptop = useMediaQuery( {minDeviceWidth: 1224} )
    const isBigScreen = useMediaQuery({minDeviceWidth: 1824})
    const isTabletOrMobile = useMediaQuery({maxWidth: 1224})
    const isTabletOrMobileDevice = useMediaQuery({maxDeviceWidth: 1224})
    const isPortrait = useMediaQuery({orientation: 'portrait'})
    const isRetina = useMediaQuery({minResolution: '2dppx'})

    const { data, error, isLoading } = useAsync({ promiseFn: loadSetInExerciseList })
    const exerciseArr=[]  // 모든 운동 목록

    const [tmpArr, setTmpArr]=useState([])  // filter로 거른 운동 목록(set_id 기준으로/선택한 블럭의 exercise 배열)
    const [setid, setSetId]=useState(0)   // 선택한 블럭의 set_id 저장 
    const [setTitle, setSetTitle]=useState('') // 선택한 블럭의 set 이름 저장
    // const [setExercise, setSetExercise]=useState([]) // 선택한 블럭의 exercise 저장

    if (data) {
        Object.keys(data).forEach(function (key) {
            exerciseArr.push(data[key]);
            console.log("test")
            console.log(exerciseArr)
        });
    }

    const setTitleClicked = (id, title) => {
        // setSetId(setid)
        console.log("start")
        // console.log(id)
        // console.log(exerciseArr.filter((element) => element.set==id))  
        {setSetId(id)}
        {setTmpArr(exerciseArr.filter((element) => element.set==id))}
        console.log(tmpArr)
        // {setSetExercise(tmpArr.filter((element) => element.exercise))}
        console.log("aaaaa")
        // console.log(setExercise)
        setSetTitle(title)
        // tmpArr의 exercise를 담은 배열을 만들고 이거를 리스트 컴포넌트에 넘겨줘서
        // 리스트 컴포넌트에서는 exercise와 id가 같은 exercise 모델을 불러와서 그거의 img 기반 배열을 만들자 
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

                    <MakeYourSetExerciseList tmpArr={tmpArr}/>

                </div>
                <a className='page-contents-btn-start' href="/training">
                    <label>START</label>
                </a>

            </div>
        </div>
    )
}

export default MakeYourSetBlocks2;