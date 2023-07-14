import { TaskContext } from "@/pages/_app";
import { useContext, useRef } from "react";
import styles from "@/styles/Settings.module.css";
export default function TimerSettings() {
  const { timerSettings, action } = useContext(TaskContext);
  const autoStartRef = useRef(timerSettings.autoStart);
  const pomoTechniqueRef = useRef(timerSettings.pomoTechnique);
  const pomodoroRef = useRef(timerSettings.pomodoro / 60);
  const shortBreakRef = useRef(timerSettings.shortBreak / 60);
  const longBreakRef = useRef(timerSettings.longBreak / 60);
  const handleKeyDown = (e) => {
    if (
      e.key === "." ||
      e.key === "+" ||
      e.key === "-" ||
      (e.key === "0" && e.target.value.length === 0)
    )
      e.preventDefault();
  };
  const onSave = (e) => {
    if (
      pomodoroRef.current.value <= 0 ||
      shortBreakRef.current.value <= 0 ||
      longBreakRef.current.value <= 0
    )
      return;
    let updatedTimerSettings = JSON.parse(JSON.stringify(timerSettings));
    updatedTimerSettings.pomodoro = pomodoroRef.current.value * 60;
    updatedTimerSettings.shortBreak = shortBreakRef.current.value * 60;
    updatedTimerSettings.longBreak = longBreakRef.current.value * 60;
    updatedTimerSettings.autoStart = autoStartRef.current.checked;
    updatedTimerSettings.pomoTechnique = pomoTechniqueRef.current.checked;
    action.updateTimerSettings(updatedTimerSettings);
  };
  return (
    <div className={styles.timersettings}>
      <h1>Timer Settings </h1>
      <p>Pomodoro (Minutes): </p>
      <input
        className={styles.numInput}
        ref={pomodoroRef}
        type="number"
        onKeyDown={handleKeyDown}
        placeholder={timerSettings.pomodoro / 60}
      />
      <br />
      <p>Short Break (Minutes): </p>
      <input
        className={styles.numInput}
        ref={shortBreakRef}
        type="number"
        onKeyDown={handleKeyDown}
        placeholder={timerSettings.shortBreak / 60}
      />
      <br />
      <p>Long Break (Minutes): </p>
      <input
        className={styles.numInput}
        ref={longBreakRef}
        type="number"
        onKeyDown={handleKeyDown}
        placeholder={timerSettings.longBreak / 60}
      />
      <br />
      <p>Auto start sessions: </p>
      <input
        ref={autoStartRef}
        defaultChecked={timerSettings.autoStart}
        type="checkbox"
        className={styles.checkInput}
      />
      <br />
      <p>Use Pomodoro Technique: </p>
      <input
        ref={pomoTechniqueRef}
        defaultChecked={timerSettings.pomoTechnique}
        type="checkbox"
        className={styles.checkInput}
      />
      <br />
      <button onClick={onSave}>Save</button>
    </div>
  );
}
