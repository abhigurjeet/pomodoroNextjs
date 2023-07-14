import Navbar from "@/Components/NavBar/index";
import CreateTask from "@/Components/Task/CreateTask/index";
import TaskSummary from "@/Components/Task/TaskSummary";
import Filters from "@/Components/Task/Filters";
import styles from "@/styles/Task.module.css";
import DisplayTask from "@/Components/Task/DisplayTasks";
export default function Task() {
  return (
    <div>
      <Navbar />
      <div className={styles.taskmiddlesection}>
        <TaskSummary />
        <CreateTask />
      </div>
      <hr />
      <Filters />
      <hr />
      <DisplayTask />
    </div>
  );
}
