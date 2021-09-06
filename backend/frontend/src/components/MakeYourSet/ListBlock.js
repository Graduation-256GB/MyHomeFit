import React from 'react';
import '../../css/MakeYourSet/ListBlock.css';
import FitnessPicture from "../../components/MakeYourSet/FitnessPicture";
import FitnessCount from '../../components/MakeYourSet/FitnessCount';

const ListBlock=({name})=>{
    return (
        <div className="list">
            <FitnessPicture name={name}/>
            <FitnessCount name="10"/>
        </div>
    )
}
export default ListBlock;