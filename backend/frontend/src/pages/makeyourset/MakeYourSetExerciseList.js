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

const loadExercise = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/exercise/')
    if (!res.ok) throw new Error(res)
    return res.json() 
}

function MakeYourSetExerciseList ({tmpArr}) {
    const isDesktopOrLaptop = useMediaQuery( {minDeviceWidth: 1224} )
    const isBigScreen = useMediaQuery({minDeviceWidth: 1824})
    const isTabletOrMobile = useMediaQuery({maxWidth: 1224})
    const isTabletOrMobileDevice = useMediaQuery({maxDeviceWidth: 1224})
    const isPortrait = useMediaQuery({orientation: 'portrait'})
    const isRetina = useMediaQuery({minResolution: '2dppx'})

    const { data, error, isLoading } = useAsync({ promiseFn: loadExercise })
    const exerciseImgArr=[]  // 모든 운동 목록

    // const [tmpArr, setTmpArr]=useState([])  // filter로 거른 운동 목록(set_id 기준으로)
    // const [setid, setSetId]=useState(0)   // 선택한 블럭의 set_id 저장 
    // const [setTitle, setSetTitle]=useState('') // 선택한 블럭의 set 이름 저장

    // tmpArr는 선택한 블럭의 운동 리스트들이 들어있는 배열
    // tmpArr의 한 운동 블럭에 있는 exercise를 이용해야 한다. 
    // tmpArr를 map으로 돌면서 exercise를 출력해보자 

    if (data) {
        Object.keys(data).forEach(function (key) {
            console.log("api/exercise확인")
            console.log(data[key])
            console.log("item.exercise 확인")
            {tmpArr.map( item => ( 
                item.exercise==data[key].id ? exerciseImgArr.push(data[key].img) : console.log("달라", item.exercise, data[key].id)
            ))}
            // exerciseImgArr.push(data[key].img);
            console.log("imgtest");
            // console.log(data[key].img);
            console.log(exerciseImgArr);
        });
    }
    
   
    return(    
            <div className='page-contents-exercise-list'>
                
                        {/* <div> */}
                        {/* <div className='page-contents-exercise'> */}
                            
                        <div className='page-contents-img-list'>   
                            {exerciseImgArr.map(element => (
                                <>
                                <img src={element}></img>
                                </>
                            ))}
                        </div>    

                        <div className='page-contents-label-list'>  
                            {tmpArr.map(item => (
                            <div className='page-contents-exercise-count'><label>{item.set_count}</label><label>회 반복</label></div>
                            ))} 
                        {/* </div> */}
                        </div>  

                        {/* {item.set_num} */}
                        {/* 이미지는 exercise의 번호를 기준으로 다시 exercise 모델 불러와서 거기 이미지 이용(api/exercise) - 컴포넌트 따로 만들자! */}
                    {/* </div>  */}
                    
                 
            </div>
    )
}

export default MakeYourSetExerciseList;