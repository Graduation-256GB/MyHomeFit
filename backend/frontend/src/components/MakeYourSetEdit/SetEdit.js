import React, { useEffect, useState } from 'react';
import '../../css/MakeYourSetForm/SetForm.css';


const SetEdit = ({ setid, Title, csrftoken }) => { 
    const [title, settitle] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        if (Title) {
            settitle(Title)
        }
    }, [Title]);

    const onSubmit = e => {
        e.preventDefault();

        const set = {
            title: title,
            type: type
        };

        fetch(`http://127.0.0.1:8000/api/set/${setid}/update/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(set)
        })
        .then(res => res.json())
        .then(data => {
            if (data.key) {
            } else {
                settitle('');
                setType('');
            }
        });
        window.location.href = '#list';
    };
    return (
        <form onSubmit={onSubmit}>
                    <div className="form-box">
                        <div className="input-box">
                            <label htmlFor="set-title">제목</label>
                            <input type="text"
                                name="set-title"
                                value={title}
                                required
                                onChange={e => settitle(e.target.value)}/>
                            <label htmlFor="set-type">카테고리</label>  
                            <select name="set-type"
                            value={type}
                            required
                            onChange={e => setType(e.target.value)}
                            defaultValue="upperbody">
                                <option value="">선택</option>
                                <option value="upperbody">상체 운동</option>
                                <option value="lowerbody">하체 운동</option>
                                <option value="other">기타</option>
                            </select>
                        </div>
                    </div>
                    <input type="submit" value="세트 수정" className="set-submit" />
                </form>
    )
}
export default SetEdit;