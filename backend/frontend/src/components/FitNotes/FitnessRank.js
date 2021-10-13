import React from 'react';
import '../../css/FitNotes/FitnessRank.css';
import { useAsync } from "react-async"

const FitnessRank = ({ name, loadRank }) => {
    const { data, error, isLoading } = useAsync({ promiseFn: loadRank })
    const RankList = []

    if (data) {
        Object.keys(data).forEach(function (key) {
            RankList.push(data[key]);
        });
        console.log(name, RankList)
    }
    return(
        <div className='rank-fitness-container'>
            <label>{name} 3 Fitness</label>
            <div>
                {
                    RankList.slice(-3).map(item => (        
                        <div className="fitness-container">
                            <div className="fitness">
                                <img src={item.img}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FitnessRank;