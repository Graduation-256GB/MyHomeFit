import React from 'react';
import '../../css/MakeYourSet/ListBlock.css';
import FitnessPicture from "../../components/MakeYourSet/FitnessPicture";
import FitnessCount from '../../components/MakeYourSet/FitnessCount';
import { FiTrash2 } from 'react-icons/fi';

const ListBlock=({name})=>{
    return (
        <div className="list">
            <div className="exercise-set-hover">
                <FiTrash2/>
            </div>
            <FitnessPicture name={name}/>
            <FitnessCount name="10"/>
        </div>
    )
}
export default ListBlock;