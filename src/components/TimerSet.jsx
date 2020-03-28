import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default ({ setCounter, startTimer, pauseTimer, paused, resetTimer }) => {

    const { register, handleSubmit, errors, setValue, setError } = useForm();

    const onSubmit = ({ hours, minutes, seconds }) => {
        let [h, m, s] = [
            hours === '' ? 0 : parseInt(hours), 
            minutes === '' ? 0 : parseInt(minutes), 
            seconds === '' ? 0 : parseInt(seconds)
        ];

        if(h + m + s === 0) {
            setError("general", "allnull", "Time to countdown must be greater than 0 seconds.");
            return;
        }

        const hoursToSeconds = (h * 60) * 60;
        const minutesToSeconds = (m * 60);
        setCounter(hoursToSeconds + minutesToSeconds + s);
        startTimer();
    }
    
    const onType = (event) => {
        const { target } = event;
        const { value, name } = target;
        const valueSplit = value.split("");
        const lastChar = valueSplit[valueSplit.length-1];
        
        if(!(/[0-9]+/.test(lastChar))) setValue(`${target.name}`, value.slice(0, value.length-1));
    }
    
    return (
        <>
            <form className='timer__set' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='hours' className="timer__set__section">
                    Hours
                    <input type="text" name='hours' id='form-hours' ref={register({
                        pattern: /[0-9]+/
                    })} placeholder='Hours' onChange={onType} autoComplete='off' />
                </label>
                <label htmlFor='minutes' className="timer__set__section">
                    Minutes
                    <input type="text" name='minutes' id='form-minutes' ref={register({
                        pattern: /[0-9]+/
                    })} placeholder='Minutes' onChange={onType} autoComplete='off' />
                </label>
                <label htmlFor='seconds' className="timer__set__section">
                    Seconds
                    <input type="text" name='seconds' id='form-seconds' ref={register({
                        pattern: /[0-9]+/
                    })} placeholder='Seconds' onChange={onType} autoComplete='off' />
                </label>
                <button type="submit">Set Timer</button>
                {errors.general && <p className='error'>{errors.general.message}</p>}
            </form>
            <button type='button' onClick={() => !paused ? pauseTimer() : startTimer()}>{paused ? "Resume" : "Pause"} Timer</button>
            <button type='button' onClick={resetTimer}>Reset Timer</button>
        </>
    )
}