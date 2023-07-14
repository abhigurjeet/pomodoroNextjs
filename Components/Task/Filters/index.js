import styles from "@/styles/Task.module.css";
import { BiFilterAlt } from "react-icons/bi";
import { useState, useContext } from "react";
import { TaskContext } from "@/pages/_app";
export default function Filters() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortDate, setSortedDate] = useState("");
  const [sortDay, setSortedDay] = useState("");
  const { action } = useContext(TaskContext);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  const handleSortDateChange = (event) => {
    setSortedDate(event.target.value);
  };
  const handleSortDayChange = (event) => {
    setSortedDay(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    action.modifyFilter({
      taskStat: selectedStatus,
      sortdate: sortDate,
      sortday: sortDay,
    });
  };
  return (
    <div className={styles.filter}>
      <select value={selectedStatus} onChange={handleStatusChange}>
        <option value="" disabled hidden>
          Task Status
        </option>
        <option value="completed">Tasks Completed</option>
        <option value="pending">Tasks Pending</option>
        <option value="all">Total Tasks</option>
      </select>
      <select value={sortDate} onChange={handleSortDateChange}>
        <option value="" disabled hidden>
          Sort by Date
        </option>
        <option value="ascending">New first</option>
        <option value="descending">Older first</option>
      </select>
      <select value={sortDay} onChange={handleSortDayChange}>
        <option value="" disabled hidden>
          Sort by Day
        </option>
        <option value="today">Today</option>
        <option value="lastweek">Last week</option>
        <option value="all">All time</option>
      </select>
      <button type="submit" onClick={handleSubmit}>
        <BiFilterAlt /> Results
      </button>
    </div>
  );
}
