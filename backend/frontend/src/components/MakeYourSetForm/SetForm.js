import React, { useState, useEffect} from 'react';
import '../../css/MakeYourSetForm/SetForm.css';
import jQuery from 'jquery'


const SetForm = ({ setNewNum,csrftoken }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');

    const onSubmit = e => {
        e.preventDefault();

        const set = {
            title: title,
            type: type
        };

        fetch('http://127.0.0.1:8000/api/set/create/', {
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
                // localStorage.clear();
                // localStorage.setItem('token', data.key);
                // window.location.replace('http://127.0.0.1:8000/makeyourset');
            } else {
                setNewNum(data.set_id);
                setTitle('');
                setType('');
                // localStorage.clear();
            }
        });
    };
    return (
        <form onSubmit={onSubmit}>
                    <div className="form-box">
                        <div className="label-box">
                            <label htmlFor="set-title">Title</label>
                            <label htmlFor="set-type">Category</label>  
                        </div>
                        <div className="input-box">
                    <input type="text"
                        name="set-title"
                        value={title}
                        required
                        onChange={e => setTitle(e.target.value)}/>
                            <select name="set-type"
                            value={type}
                            required
                            onChange={e => setType(e.target.value)}>
                                <option value="" defaultValue>선택</option>
                                <option value="upperbody">상체 운동</option>
                                <option value="lowerbody">하체 운동</option>
                                <option value="other">기타</option>
                            </select>
                        </div>
                    </div>
                    <input type="submit" value="Next Step" className="set-submit" />
                </form>
    )
}
export default SetForm;