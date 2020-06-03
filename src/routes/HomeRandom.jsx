import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LinksFlyout from '../components/LinksFlyout';
import "./styles.scss";
import { randomWorkout } from '../state/workoutSlice';

const HomeRandom = () => {
    const workoutData = useSelector(randomWorkout);
    const [workoutRoutine, setWorkoutRoutine] = useState({
        workoutType: "",
        workoutImage: "",
        sets: 0,
        reps: 0
      })
    const newRandom=(max,min)=>{
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    const triggerNewSet=()=>{
        if(workoutData.length){
            const num = workoutData.length
            const newNum = Math.floor(Math.random()*Math.floor(num));
            const newWorkout = workoutData[newNum];
            const newSets = newRandom(newWorkout.maxSets, newWorkout.minSets);
            const newReps = newRandom(newWorkout.maxReps, newWorkout.minReps);

            setWorkoutRoutine({
            workoutType: newWorkout.workoutType,
            workoutImage: newWorkout.workoutImage,
            sets: newSets,
            reps: newReps
            })
        }
    }
    
    return (
        <div className="random-workout-block">
            <div className="random-workout-inner-block">
            < LinksFlyout />
            { !workoutRoutine && <div>Click NEW SET to begin</div>}
            { workoutRoutine && 
            <>
                <img className="imgDisplay" alt={workoutRoutine.workoutType} src={workoutRoutine.workoutImage} />
                <b className="typeDisplay">{workoutRoutine.workoutType}</b>
                <p className="setsDisplay">Do: <b>{workoutRoutine.sets}</b> rounds</p>
                <p className="repsDisplay">Do: <b>{workoutRoutine.reps}</b> times/round</p>
            </>
            }
            <button onClick={triggerNewSet}>NEW SET</button>
            </div>
        </div>
    );
}

export default HomeRandom;