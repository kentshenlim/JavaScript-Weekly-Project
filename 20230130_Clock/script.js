/* eslint-disable linebreak-style */
window.onload = () => {
  const hourDisp = document.getElementById('hour');
  const minuteDisp = document.getElementById('minute');
  const secondDisp = document.getElementById('second');
  const meridiamDisp = document.getElementById('meridiam');
  setInterval(updateTime, 1000); // Update every 1s

  function updateTime() {
    const date = new Date();
    let [hour, minute, second] = [
      String(date.getHours()),
      String(date.getMinutes()),
      String(date.getSeconds()),
    ];
    const meridiam = ((hour < 12) ? 'AM' : 'PM');
    if (hour === 0) hour = 12;
    if (+hour > 12) hour = String(hour - 12);
    // Fix length
    hour = fixLength(hour);
    minute = fixLength(minute);
    second = fixLength(second);
    // Update display
    hourDisp.textContent = hour;
    minuteDisp.textContent = minute;
    secondDisp.textContent = second;
    meridiamDisp.textContent = meridiam;
  }

  function fixLength(s) {
    if (s.length === 1) return `0${s}`;
    return s;
  }
};
