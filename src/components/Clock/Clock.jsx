import { useEffect, useState } from "react";
import calcMeetingDuration from "../Conference/calcDuration";
import styles from "./Clock.module.css";

function Clock() {
  const [time, setTime] = useState({ hours: 0, mins: 0, secs: 0 });

  const { hours, mins, secs } = time;

  useEffect(() => {
    setTimeout(
      () =>
        setTime(
          calcMeetingDuration(
            new Date().getTime() - localStorage.getItem("StartTime")
          )
        ),
      1000
    );
  }, [time]);

  return (
    <div className={styles.clock_wrapper}>
      <h5 className={styles.clock_heading}>Meeting Time</h5>
      <span className={styles.time_wrapper}>
        {hours !== "00" && <p>{hours}:</p>}
        <p>
          {mins}:{secs}
        </p>
      </span>
    </div>
  );
}

export default Clock;
