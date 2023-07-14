import styles from "@/styles/Task.module.css";
import { useState, useContext, useRef } from "react";
import { TaskContext } from "@/pages/_app";
export default function CreateTask() {
  const { action } = useContext(TaskContext);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dueDateRef = useRef(null);
  const estTomatoRef = useRef(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    let taskDetails = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      dueDate: dueDateRef.current.value,
      estTomato: estTomatoRef.current.value,
      tomato: 0,
      createDate: new Date(),
      completedOn: "",
      taskStatus: "Not started",
    };
    if (
      taskDetails.title.trim().length &&
      taskDetails.description.trim().length
    )
      action.addtask(taskDetails);
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    estTomatoRef.current.value = 1;
  };
  return (
    <div className={styles.createtask}>
      <form>
        <input type="text" ref={titleRef} placeholder="Title" />
        <br />
        <input
          className={styles.description}
          type="text"
          ref={descriptionRef}
          placeholder="Description"
        />
        <br />
        <input
          type="date"
          ref={dueDateRef}
          min={new Date().toISOString().split("T")[0]}
          defaultValue={new Date().toISOString().split("T")[0]}
        />
        <br />
        <input
          type="number"
          ref={estTomatoRef}
          placeholder="Est. tomato required"
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Create <br />
          task
        </button>
      </form>
    </div>
  );
}
