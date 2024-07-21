import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const instanceId = window.setInterval(() => {
      if (count > 0 && !isPaused) {
        setCount((prev) => prev + 1);
      }
    }, 1000);

    return () => {
      clearInterval(instanceId);
    };
  }, [count, isPaused]);

  const onStartResetClick = (isStarted: boolean) => {
    if (isStarted) {
      setCount(0);
      setIsStarted(false);
    } else {
      setIsStarted(true);
      setCount((prev) => prev + 1);
    }
  };

  const getTimer = (c: number): string => {
    const seconds = c % 60;
    const minutes = c / 60;
    const hours = Math.floor(minutes / 60);
    const actualMinutes = Math.floor(minutes % 60);

    if (Number(hours) >= 24) {
      setCount(0);
      setIsStarted(false);
      setIsPaused(false);
      return "00:00:00";
    }
    const pattern = (num: number): string => {
      return num < 10 ? "0" + num : num.toString();
    };
    return `${pattern(hours)}.${pattern(actualMinutes)}.${pattern(seconds)}`;
  };

  return (
    <div className="App">
      <section>
        <h2 style={{ color: "#000" }}>{getTimer(count)}</h2>
      </section>
      <section>
        <button onClick={() => onStartResetClick(isStarted)}>
          {isStarted ? "Reset" : "Start"}
        </button>
        <button onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? "Resume" : "Pause"}
        </button>
      </section>
    </div>
  );
}

export default App;
