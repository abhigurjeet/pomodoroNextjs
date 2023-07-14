import { useContext } from "react";
import { TaskContext } from "@/pages/_app";
import styles from "@/styles/Analytics.module.css";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};
export default function BarChart() {
  const { taskList } = useContext(TaskContext);
  const labels = Array.from({ length: 7 }, (xyz, index) => {
    let date = new Date();
    date.setDate(new Date().getDate() - index + 1);
    return `${date.getDate() - 1}/${date.getMonth() + 1}`;
  }).reverse();

  const trainingData = Array(7).fill(0);
  taskList
    .filter((item, i) => item.taskStatus === "Completed")
    .filter((item) => {
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const daydiff = Math.floor(
        (new Date() - item.completedOn) / millisecondsPerDay
      );
      if (daydiff < 7 && daydiff > -1) ++trainingData[daydiff];
      return daydiff < 7;
    });
  trainingData.reverse();

  const data = {
    labels,
    datasets: [
      {
        label: "Last Week Progress",
        data: trainingData,
        backgroundColor: "#f5ba13",
      },
    ],
  };
  return (
    <div className={styles.bar}>
      <Bar options={options} data={data} />
    </div>
  );
}
