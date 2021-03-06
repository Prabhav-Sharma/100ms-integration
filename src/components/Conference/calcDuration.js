const padNumber = (num) => (num <= 9 ? "0" + num : num);

const calcMeetingDuration = (ms) => {
  let timeStr = "";
  ms = (ms - (ms % 1000)) / 1000;
  const secs = ms % 60;
  timeStr += secs + " secs";
  ms = (ms - secs) / 60;
  const mins = ms % 60;
  if (mins !== 0) timeStr = mins + " mins " + timeStr;
  const hours = (ms - mins) / 60;
  if (hours !== 0) timeStr = hours + " hours " + timeStr;
  return {
    timeStr,
    hours: padNumber(hours),
    mins: padNumber(mins),
    secs: padNumber(secs),
  };
};

export default calcMeetingDuration;
