/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
function showTime() {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let session = 'AM';

  if (h === 0) h = 12;
  if (h > 12) {
    h -= 12;
    session = 'PM';
  }

  h = (h < 10) ? `0${h}` : h;
  m = (m < 10) ? `0${m}` : m;
  s = (s < 10) ? `0${s}` : s;

  const time = `${h}:${m}:${s} ${session}`;
  document.getElementById('MyClockDisplay').innerText = time;

  setTimeout(showTime, 1000); // Not setInterval here, recursive
}

showTime();
