import React, {useState, useEffect} from 'react';
import { useMediaQuery } from "react-responsive";
import axios from 'axios';

// import MakeYourSetMain from './MakeYourSetMain';
import '../css/gaok/MakeYourSet.css'
import IconSet from '../images/icon_makeyourset.png';
// import IconAddSet from '../../images/icon_add_set.png'
// import IconStart from '../..//images/icon_start.png'
// import IconSquat from '../../images/icon_set_squat.png'
import { useAsync } from "react-async"

// import MakeYourSetBlocks2 from './MakeYourSetBlocks2';

// const loadSetList = async () => {
//     const res = await fetch('http://127.0.0.1:8000/api/set/list/')
//     if (!res.ok) throw new Error(res)
//     return res.json() 
// }

// const loadExercise = async ({ setid }) => {
//     const res = await fetch(`http://127.0.0.1:8000/api/exerciseset/${setid}/`)
//     if (!res.ok) throw new Error(res)
//     return res.json() 
// }

function MakeYourSet () {
    const [resp, setGitData] = useState({ data: null, repos: null });

    useEffect(() => {
        const fetchData = async () => {
            const respGlobal = await axios(
                'http://127.0.0.1:8000/api/set/list/'
            );
            const respRepos = await axios(
                'http://127.0.0.1:8000/api/exerciseset/1/'
            );

            setGitData({ data: respGlobal.data, repos: respRepos.data });
        };

        fetchData();
     }, []);

    console.log('render');
    if (resp.data) {
        console.log("setlist", resp.data);
        console.log("exerciseset", resp.repos)
    }

    const isDesktopOrLaptop = useMediaQuery( {minDeviceWidth: 1224} )
    const isBigScreen = useMediaQuery({minDeviceWidth: 1824})
    const isTabletOrMobile = useMediaQuery({maxWidth: 1224})
    const isTabletOrMobileDevice = useMediaQuery({maxDeviceWidth: 1224})
    const isPortrait = useMediaQuery({orientation: 'portrait'})
    const isRetina = useMediaQuery({ minResolution: '2dppx' })
    const setArr = []
    const SetNameArr = []

    // const { data, error, isLoading } = useAsync({ promiseFn: loadSetList })

    const [isExistSet, setExistSet] = useState(true)
    
    // if (data) {
    //     Object.keys(data).forEach(function (key) {
    //         setArr.push(data[key]);
    //         console.log(data[key].title)
    //         console.log(data[key].id)
    //         SetNameArr.push(data[key].title)
    //     });
    //     console.log(SetNameArr.length);
        
    // }
    return(
        <>
        <div className='page-top-layer'>
            <div className='page-top-container'>
                <div className='page-wrapper'>
                    <div className='page-title'>
                        <div>
                            <label>Only for you, Gaok</label>
                            <img src={IconSet}/>
                        </div>

                        <svg width="100" height="100">
                            <circle cx="50" cy="50" r="50" fill="white"></circle>
                        </svg>
                    </div>
                    <div className='page-small-title'>
                        <label>Make Your Fitness Set.</label>
                    </div> 
                </div>
            </div>
            {/* <div className='page-center-container'>
                <div className='page-block-wrapper'>
                    <MakeYourSetBlocks setArr={setArr}/>
                </div>
                <div className='page-contents-wrapper'></div>
            </div> */}
            {/* <MakeYourSetBlocks2 setArr={setArr} /> */}
        </div>

        </>
    )


}

export default MakeYourSet;