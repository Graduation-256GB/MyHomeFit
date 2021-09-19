import React from 'react';
import '../../css/Training/NextPose.css';

const NextPose = ( { exercises } ) => {
    return (
        <div className="next-pose-container">
            {
                exercises.map(item => (
                <div className="next-videos">
                    <img src={item.img} />
                </div>
            ))
            }
        </div>
    )
}

export default NextPose;