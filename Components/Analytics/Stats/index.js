import styles from "@/styles/Analytics.module.css";
import { useContext } from "react";
import { TaskContext } from "@/pages/_app";
export default function Stats() {
  const { taskList, todayTomato, weeklyTomato, timerSettings } =
    useContext(TaskContext);
  const trainingData = Array(7).fill(0);
  const focusTime = (val) => {
    let temp = (val * timerSettings.pomodoro) / 60;
    return `${Math.floor(temp / 60)} HR  ${temp % 60} MIN`;
  };
  let weeklySum = weeklyTomato.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  taskList
    .filter((item, i) => item.taskStatus === "Completed")
    .filter((item) => {
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const daydiff = Math.floor(
        (new Date() - item.completedOn) / millisecondsPerDay
      );
      if (daydiff < 7 && daydiff > -1) {
        ++trainingData[daydiff];
      }
      return daydiff < 7;
    });
  return (
    <div className={styles.stats}>
      <div className={styles.statsbox}>
        <h1>Today</h1>
        <h3>Done: {trainingData[0]}</h3>
        <h3>Tomato: {todayTomato.count}</h3>
        <h3>Focus Time: {focusTime(todayTomato.count)}</h3>
      </div>
      <div className={styles.statsbox}>
        <h1>Last 7 days</h1>
        <h3>
          Done:{" "}
          {trainingData.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          )}
        </h3>
        <h3>Tomato:{weeklySum}</h3>
        <h3>Focus Time: {focusTime(weeklySum)}</h3>
      </div>
    </div>
  );
}
