import React from 'react';

import styled from 'styled-components';

export default ({ hours, minutes, seconds }) => {
    return (
        <StyledTimerArea className='timer__display'>
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
        </StyledTimerArea>
    );
}

const StyledTimerArea = styled.div`
    margin-top: 20px;

    ul {
        width: 100%;
        height: 20vh;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        li {
            width: 30%;

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;

            margin-bottom: 15px;

            p {
                color: white;
            }

            p:first-of-type {
                margin-right: 10px;
                background: #4987C4;
                padding: 10px;
                text-align: center;
            }
        }
    }
`;