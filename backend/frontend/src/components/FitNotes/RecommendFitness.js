import React from 'react';
import '../../css/FitNotes/RecommendFitness.css';
import '../../components/FitNotes/RecommendSet'
import RecommendSet from "./RecommendSet";
import { useAsync } from "react-async"
const loadRank = async () => {
    const Token = localStorage.getItem('token')
    const res = await fetch('http://127.0.0.1:8000/api/user/rank/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${Token}`
        }
    })
    if (!res.ok) throw new Error(res)
    return res.json()
}

const RecommendFitness = ({ name, nameList, imgList }) => {
        const { data, error, isLoading } = useAsync({ promiseFn: loadRank })
        const rankList = []

    if (data) {
        Object.keys(data).forEach(function (key) {
            rankList.push(data[key]);
        });
        console.log(rankList)
    }   
    return(
        <div className="recommend-fitness-container">
            {/*<label>Recommend for {name}</label>*/}
            <label>{name}</label>
            {
                rankList.map((item,index) => (
                    <RecommendSet name={item.username} rank={parseInt(index)+1 } proImg={item.profile_img}/>
                ))
            }
        </div>
    )
}

export default RecommendFitness;