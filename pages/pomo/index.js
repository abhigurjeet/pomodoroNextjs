import Navbar from "@/Components/NavBar/index";
import TimerSection from "@/Components/Pomo/TimerSection";
import ActiveTask from "@/Components/Pomo/ActiveTask";
import { useContext, useEffect } from "react";
import { TaskContext } from "../_app";
export default function Pomo() {
  return (
    <div>
      <Navbar />
      <TimerSection />
      <ActiveTask />
    </div>
  );
}
