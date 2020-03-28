import React, { useState, useEffect } from "react";

import styled from 'styled-components';

import TimerArea from "./components/TimerArea";
import TimerSet from "./components/TimerSet";

function App() {
    const [counter, setCounter] = useState(0);
    const [timers, setTimers] = useState([]);
    const [paused, setPaused] = useState(false);

    const startTimer = () => {
        for (let i in timers) {
            const id = timers[i];
            clearInterval(id);
        }
        setTimers([]);

        setPaused(false);

        const timer = setInterval(() => {
            setCounter(prev => {
                if (prev === 0) {
                    // End Timer
                    console.log("Ended at " + counter);
                    setCounter(0);
                    clearInterval(timer);
                    return;
                } else return prev - 1;
            });
        }, 1000);

        setTimers([...timers, timer]);
    };

    const pauseTimer = () => {
        for (let i in timers) {
            const id = timers[i];
            clearInterval(id);
        }
        setTimers([]);
        setPaused(true);
    };

    const resetTimer = () => {
        for (let i in timers) {
            const id = timers[i];
            clearInterval(id);
        }
        setTimers([]);
        setCounter(0);
        setPaused(false);
    };

    const parseTimes = () => {
        const h = Math.floor(counter / 3600);
        const m = Math.floor(counter / 60 - 60 * h);
        const s = Math.floor(counter % 60);
        return [h, m, s];
    };

    useEffect(() => {
        console.log("Time left: ", counter);
    }, [counter]);

    return (
        <StyledApp className="app">
            {/* Timer Area */}
            <TimerArea
                hours={parseTimes()[0]}
                minutes={parseTimes()[1]}
                seconds={parseTimes()[2]}
            />
            {/* Set Timer Area */}
            <TimerSet
                startTimer={startTimer}
                setCounter={setCounter}
                pauseTimer={pauseTimer}
                paused={paused}
                resetTimer={resetTimer}
            />
        </StyledApp>
    );
}

const StyledApp = styled.div`
  width: 300px;
  height: 500px;

  display:flex;
  flex-direction: column;

  background: linear-gradient(10deg, rgba(145, 199, 227, 1) 0%, rgba(76, 190, 249, 1) 100%);
  box-shadow: 8px 8px 8px rgba(38,140,191, .3);
`;

export default App;
