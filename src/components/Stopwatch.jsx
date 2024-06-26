// src/components/Stopwatch.jsx
import { useState, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [finalTime, setFinalTime] = useState(null);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const startPauseTimer = () => {
    if (running) {
      clearInterval(timerRef.current);
    } else {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setRunning(!running);
    setFinalTime(null); 
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setFinalTime(time);
    setTime(0);
    setRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setFinalTime(null);
    setRunning(false);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-clock">
        <h1>Stopwatch</h1>
        <div className="stopwatch-time">{formatTime(time)}</div>
        <div className="stopwatch-buttons">
          <button className={running ? 'pause' : 'start'} onClick={startPauseTimer}>
            {running ? 'Pause' : 'Start'}
          </button>
          <button className="stop" onClick={stopTimer}>Stop</button>
          <button className="reset" onClick={resetTimer}>Reset</button>
        </div>
        {finalTime !== null && <div className="final-time">Final Time: {formatTime(finalTime)}</div>}
      </div>
    </div>
  );
};

export default Stopwatch;
