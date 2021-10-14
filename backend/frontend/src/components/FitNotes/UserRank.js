import React from 'react';
import '../../css/FitNotes/Rank.css';
import './SetContent'
import UserContent from "./UserContent";
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

const UserRank = ({ name}) => {
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
            <label>{name}</label>
            {
                rankList.map((item,index) => (
                    <UserContent name={item.username} proImg={item.profile_img} index={parseInt(index)+1}/>
                ))
            }
        </div>
    )
}

export default UserRank;