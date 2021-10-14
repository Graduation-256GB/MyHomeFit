import React from 'react';
import '../../css/FitNotes/Rank.css';
import './SetContent'
import SetContent from "./SetContent";
import { useAsync } from "react-async"
const loadRank = async () => {
    const Token = localStorage.getItem('token')
    const res = await fetch('http://127.0.0.1:8000/api/set/rank/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${Token}`
        }
    })
    if (!res.ok) throw new Error(res)
    return res.json()
}

const SetRank = ({ name}) => {
        const { data, error, isLoading } = useAsync({ promiseFn: loadRank })
        const rankList = []

    if (data) {
        Object.keys(data).forEach(function (key) {
            rankList.push(data[key]);
        });
    }   
    return(
        <div className="recommend-fitness-container">
            <label>{name}</label>
            {
                rankList.map((item,index) => (
                    <SetContent title={item.title} count={item.selected_count} user={item.user} type={ item.type }/>
                ))
            }
        </div>
    )
}

export default SetRank;