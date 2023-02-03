/* eslint-disable linebreak-style */
window.onload = () => {
  const hourDisp = document.getElementById('hour');
  const minuteDisp = document.getElementById('minute');
  const secondDisp = document.getElementById('second');
  const meridiamDisp = document.getElementById('meridiam');
  setInterval(updateTime, 1000); // Update every 1s

  function updateTime() {
    const date = new Date();
    const [minute, second] = [
      date.getMinutes(),
      date.getSeconds(),
    ];
    let hour = date.getHours();
    const meridiam = ((hour < 12) ? 'AM' : 'PM');
    if (hour > 12) hour -= 12;
    hourDisp.textContent = hour;
    minuteDisp.textContent = minute;
    secondDisp.textContent = second;
    meridiamDisp.textContent = meridiam;
  }
};
