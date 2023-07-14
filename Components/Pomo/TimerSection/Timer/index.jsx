import styles from "@/styles/Pomo.module.css";
import { HiPlay, HiPause } from "react-icons/hi";
import { AiOutlineReload, AiFillCloseCircle } from "react-icons/ai";
import { useState, useEffect, useRef, useContext } from "react";
import { TaskContext } from "@/pages/_app";

export default function Timer({
  activeSession,
  sessionCompleted,
  handleClose,
}) {
  const { timerSettings, action, activeTask } = useContext(TaskContext);
  const [seconds, setSeconds] = useState(timerSettings[activeSession]);
  const [pause, setPause] = useState(true);
  useEffect(() => {
    setSeconds(timerSettings[activeSession]);
    if (timerSettings.autoStart && activeTask !== -1) setPause(false);
    else setPause(true);
  }, [activeSession]);

  useEffect(() => {
    let interval;
    if (!pause) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 1) {
            setPause(true);
          }
          return prev - 1;
        });
      }, 1000);
    }
    if (seconds === 0) sessionCompleted();
    return () => {
      clearInterval(interval);
    };
  }, [pause]);
  const buttonDisabled = seconds === 0 || activeTask === -1;
  const buttonColor = seconds === 0 || activeTask === -1 ? "#ccc" : "#f5ba13";

  return (
    <>
      <h1>
        {Math.floor(seconds / 60) < 10
          ? `0${Math.floor(seconds / 60)}`
          : Math.floor(seconds / 60)}
        :{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </h1>
      <div className={styles.buttonsection}>
        <button
          onClick={() => {
            setPause(true);
            setSeconds(timerSettings[activeSession]);
            action.updateTaskStatus(activeTask, "Not started");
            action.setActiveTask(-1);
            handleClose();
          }}
          disabled={activeTask === -1}
          style={{ color: activeTask === -1 ? "#ccc" : "#f5ba13" }}
        >
          <AiFillCloseCircle />
        </button>
        <button
          disabled={buttonDisabled}
          onClick={() => setPause((prev) => !prev)}
          style={{ color: buttonColor }}
        >
          {pause ? <HiPlay /> : seconds === 0 ? <HiPlay /> : <HiPause />}
        </button>
        <button
          onClick={() => {
            setSeconds(timerSettings[activeSession]);
            if (timerSettings.autoStart) setPause(false);
            else setPause(true);
          }}
          disabled={activeTask === -1}
          style={{ color: activeTask === -1 ? "#ccc" : "#f5ba13" }}
        >
          <AiOutlineReload />
        </button>
      </div>
    </>
  );
}
