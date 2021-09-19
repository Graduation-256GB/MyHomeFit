import React, { useState } from 'react';
import { useAsync } from "react-async"
import '../../css/Training/RealtimeInfo.css';

const loadExerciseLog = async ({ set_id }) => {
    const res = await fetch(`http://127.0.0.1:8000/api/log/${set_id}/`)
    if (!res.ok) throw new Error(res)
    return res.json()
}

const RealtimeInfo = ( { setId, length } ) => {
    const { data, error, isLoading } = useAsync({ promiseFn: loadExerciseLog, set_id: setId })

    {/*fetch(`http://127.0.0.1:8000/api/log/${ setId }/`,{
        method:"POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            user_id : 1,
            set_exercise_id : 1,
            set_id: { setId },
            correct_count: 0,
            fail_count: 0,
            time_started: new Date()
        })
    }).then(response=>response.json())
        .then(data=>console.log(data))
        .catch(error=>console.log(error));*/}

    const Logs = [];
    const [count, setCount] = useState([])
    const current_index = 0;

    if (data) {
        const temp = [];
        Object.keys(data).forEach(function (key) {
            temp.push(data[key]);
        });

        temp.slice(-length).map(item => (
            Logs.push(item)
        ))
        console.log("temp.slice: ", temp.slice(-length))
        console.log("Log: ", Logs)
    }

    return (
        <div className="realtime-info">
            Squat 1/10회
        </div>
    )
}

export default RealtimeInfo;