import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import { BiTimeFive } from "react-icons/bi";
import { FaTasks, FaChartBar } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
export default function NavBar() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <h1>Pomodoro</h1>
      </Link>
      <div className={styles.navbar}>
        <Link href="/pomo">
          <h3>
            <BiTimeFive />
          </h3>
        </Link>
        <Link href="/task">
          <h3>
            <FaTasks />
          </h3>
        </Link>
        <Link href="/analytics">
          <h3>
            <FaChartBar />
          </h3>
        </Link>
        <Link href="/settings">
          <h3>
            <MdOutlineSettings />
          </h3>
        </Link>
      </div>
    </div>
  );
}
