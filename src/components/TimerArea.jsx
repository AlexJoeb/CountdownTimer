import React from 'react';

export default ({ hours, minutes, seconds }) => {
    return (
        <div className='timer__display'>
            <ul>
                <li className="timer__display__hours">
                    <p className="timer__display__hours--number">{hours}</p>
                    <p className="timer__display__hours--tag">Hours</p>
                </li>
                <li className="timer__display__minutes">
                    <p className="timer__display__hours--number">{minutes}</p>
                    <p className="timer__display__hours--tag">Minutes</p>
                </li>
                <li className="timer__display__seconds">
                    <p className="timer__display__hours--number">{seconds}</p>
                    <p className="timer__display__hours--tag">Seconds</p>
                </li>
            </ul>
        </div>
    );
}