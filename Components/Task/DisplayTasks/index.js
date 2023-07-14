import { HiPlay, HiPause, HiCheckCircle } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import styles from "@/styles/Task.module.css";
import { useState, useContext } from "react";
import { TaskContext } from "@/pages/_app";
import Link from "next/link";
export default function DisplayTasks() {
  const { taskList, activeTask, action, filters } = useContext(TaskContext);

  //FILTER LOGIC
  const filteredList = taskList
    .map((item, i) => ({ item, ind: i }))
    .filter((item) => {
      //filter for taskStatus
      if (filters.taskStat === "" || filters.taskStat === "all") {
        return true;
      } else if (filters.taskStat === "completed") {
        return item.item.taskStatus === "Completed";
      } else if (filters.taskStat === "pending") {
        return item.item.taskStatus !== "Completed";
      }
    })
    .filter((item) => {
      //filter for Day
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const daydiff = Math.floor(
        (new Date() - item.item.createDate) / millisecondsPerDay
      );
      if (filters.sortday === "today") {
        return daydiff < 1;
      } else if (filters.sortday === "lastweek") {
        return daydiff < 7;
      } else return true;
    });
  if (filters.sortdate === "" || filters.sortdate === "ascending") {
    filteredList.reverse();
  }

  //EVENT HANDLERS
  const handlePlay = (i, e) => {
    if (taskList[i].taskStatus === "Not started") {
      if (activeTask !== -1) action.updateTaskStatus(activeTask, "Not started");
      action.setActiveTask(i);
      action.updateTaskStatus(i, "Started");
    } else {
      action.updateTaskStatus(i, "Not started");
      action.setActiveTask(-1);
    }
  };
  const handleDelete = (i) => {
    if (activeTask === i) {
      action.setActiveTask(-1);
    }
    if (activeTask > i) action.setActiveTask(activeTask - 1);
    action.deleteTask(i);
  };

  return (
    <div className={styles.displaytask}>
      {filteredList.map((item, i) => {
        return (
          <div key={i} className={styles.taskitem}>
            <strong>{item.item.title}</strong>
            <p>{item.item.description}</p>
            <span>Due Date: {item.item.dueDate}</span>
            <button
              className={styles.playbutton}
              disabled={item.item.taskStatus === "Completed"}
              onClick={(e) => handlePlay(item.ind, e)}
            >
              {item.item.taskStatus === "Not started" ? (
                <Link href="/pomo" className={styles.playA}>
                  <HiPlay />
                </Link>
              ) : item.item.taskStatus === "Started" ? (
                <HiPause />
              ) : (
                <HiCheckCircle />
              )}
            </button>

            <button
              className={styles.deletebutton}
              onClick={() => handleDelete(item.ind)}
            >
              <AiFillDelete />
            </button>
          </div>
        );
      })}
    </div>
  );
}
