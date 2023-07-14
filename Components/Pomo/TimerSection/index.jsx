import Timer from "./Timer";
import styles from "@/styles/Pomo.module.css";
import { useState, useContext } from "react";
import { TaskContext } from "@/pages/_app";
export default function TimerSection() {
  const pomoPattern = [
    "pomodoro",
    "shortBreak",
    "pomodoro",
    "shortBreak",
    "pomodoro",
    "shortBreak",
    "pomodoro",
    "longBreak",
  ];

  const [patternSession, setPatternSession] = useState(0);
  const { timerSettings, action } = useContext(TaskContext);
  const [activeButton, setActiveButton] = useState("pomodoro");
  const sessionCompleted = () => {
    if (activeButton === "pomodoro") action.incrementTomato();
    if (timerSettings.pomoTechnique) {
      setPatternSession((prev) => (prev + 1) % 8);
      setActiveButton(pomoPattern[(patternSession + 1) % 8]);
    }
  };
  const handleClose = () => {
    setActiveButton("pomodoro");
  };
  const handleClick = (e) => {
    e.preventDefault();
    setActiveButton(e.target.value);
  };
  return (
    <div className={styles.timer}>
      <div className={styles.timernavbar}>
        <button
          disabled={timerSettings.pomoTechnique}
          onClick={handleClick}
          value="pomodoro"
          className={
            activeButton === "pomodoro"
              ? styles.activebutton
              : styles.inactivebutton
          }
        >
          Pomodoro
        </button>
        <button
          disabled={timerSettings.pomoTechnique}
          onClick={handleClick}
          value="shortBreak"
          className={
            activeButton === "shortBreak"
              ? styles.activebutton
              : styles.inactivebutton
          }
        >
          Short Break
        </button>
        <button
          disabled={timerSettings.pomoTechnique}
          onClick={handleClick}
          value="longBreak"
          className={
            activeButton === "longBreak"
              ? styles.activebutton
              : styles.inactivebutton
          }
        >
          Long Break
        </button>
      </div>
      <Timer
        activeSession={activeButton}
        sessionCompleted={sessionCompleted}
        handleClose={handleClose}
      />
    </div>
  );
}
