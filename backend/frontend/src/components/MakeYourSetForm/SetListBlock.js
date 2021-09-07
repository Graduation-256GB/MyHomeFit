import React from 'react';
import '../../css/MakeYourSetForm/SetListBlock.css';
import FitnessPicture from "./FitnessPicture";
import FitnessCount from './FitnessCount';
import { FiTrash2 } from 'react-icons/fi';

const SetListBlock = ({ picture, name, count, removeList }) => {
    return (
        <div className="list">
            <div className="exercise-set-hover" data-img={picture} data-name={name } onClick={ removeList}>
                <FiTrash2 data-img={picture} data-name={name }/>
            </div>
            <FitnessPicture name={picture} />
            <FitnessCount count={count }/>
        </div>
    )
}
export default SetListBlock;