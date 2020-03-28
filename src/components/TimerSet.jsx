import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

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

    const resetTimerSet = () => {
        setValue("hours", "");
        setValue("minutes", "");
        setValue("seconds", "");
        resetTimer();
    }
    
    return (
        <StyledTimerSet className='timerArea'>
            <form className='timer__set' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='hours' className="timer__set__section">
                    Hours
                    <input type="text" name='hours' id='form-hours' ref={register} onChange={onType} autoComplete='off' />
                </label>
                <label htmlFor='minutes' className="timer__set__section">
                    Minutes
                    <input type="text" name='minutes' id='form-minutes' ref={register} onChange={onType} autoComplete='off' />
                </label>
                <label htmlFor='seconds' className="timer__set__section">
                    Seconds
                    <input type="text" name='seconds' id='form-seconds' ref={register} onChange={onType} autoComplete='off' />
                </label>
                <button type="submit">Set Timer</button>
                {errors.general && <p className='error'>{errors.general.message}</p>}
            </form>
            <button type='button' onClick={() => !paused ? pauseTimer() : startTimer()}>{paused ? "Resume" : "Pause"} Timer</button>
            <button type='button' onClick={resetTimerSet}>Reset Timer</button>
        </StyledTimerSet>
    )
}

const StyledTimerSet = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    form {
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 80%;
    justify-content: space-between;
    align-items: center;
    label, button {
        flex-basis: 30%;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        color: white;

        input { 
            width: 100%; 
            height: 40px;
            margin-bottom: 15px;
            border: 0;
            
            background: #4987C4;
            color:white;
            font-weight: bold;
            text-align: center;

            &:active, &:focus {
                outline: none;
            }
        }
    }

        button {
            flex-grow: 1;
            margin: 20px 0 10px;
        }
    }

    button {
        width: 80%;
        background: #4987C4;
        padding: 10px 0;
        border: 0;
        font-size: 1rem;
        font-weight: bold;
        color: white;

        & + button {
            margin-top: 10px;
        }
    }
`;