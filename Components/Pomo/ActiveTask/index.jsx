import { useState, useContext } from "react";
import Link from "next/link";
import { TaskContext } from "@/pages/_app";
import { HiCheckCircle } from "react-icons/hi";
import { MdAddCircle } from "react-icons/md";
import styles from "@/styles/Pomo.module.css";
export default function ActiveTask() {
  const { activeTask, taskList, action } = useContext(TaskContext);
  const handleMarkAsComplete = (e) => {
    action.updateTaskStatus(activeTask, "Completed");
    action.setActiveTask(-1);
  };
  return (
    <>
      {activeTask === -1 ? (
        <div className={styles.noactivetask}>
          <h1>Add a task to start Timer</h1>
          <Link href="/task">
            <button className={styles.addbutton}>Create New Task</button>
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.activetask}>
            <div className={styles.activetaskleft}>
              <strong>{taskList[activeTask].title}</strong>
              <p>{taskList[activeTask].description}</p>
              <strong>Due Date: {taskList[activeTask].dueDate}</strong>
            </div>
            <div className={styles.activetaskright}>
              <span>Tomato: {taskList[activeTask].tomato}</span>
              <Link href="/task">
                <button type="submit" onClick={handleMarkAsComplete}>
                  <HiCheckCircle /> Mark As Completed
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
