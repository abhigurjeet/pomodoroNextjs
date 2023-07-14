import styles from "@/styles/Task.module.css";
import { useState, useContext } from "react";
import { TaskContext } from "@/pages/_app";
export default function TaskSummary() {
  const { taskList } = useContext(TaskContext);
  let totalTomato = 0;
  const temp = taskList.filter((item) => {
    totalTomato += item.tomato;
    return item.taskStatus === "Completed";
  });

  return (
    <div className={styles.tasksummary}>
      <h3>Tomato: {totalTomato}</h3>
      <h3>Total tasks: {taskList.length}</h3>
      <h3>Tasks Completed: {temp.length}</h3>
      <h3>Tasks Pending: {taskList.length - temp.length}</h3>
    </div>
  );
}
