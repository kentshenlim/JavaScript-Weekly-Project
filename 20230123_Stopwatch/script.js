window.onload = function () {
  // Import constants and initialize global var
  let msec = 0;
  let sec = 0;
  const msecDisp = document.querySelector('span#milliseconds');
  const secDisp = document.querySelector('span#seconds');
  const startBtn = document.querySelector('button#start');
  const stopBtn = document.querySelector('button#stop');
  const resetBtn = document.querySelector('button#reset');
  let Interval;

  startBtn.addEventListener('click', () => {
    clearInterval(Interval);
    Interval = setInterval(startCounting, 10); // Implement startCounting every 10 ms
  });

  stopBtn.addEventListener('click', () => {
    clearInterval(Interval); // Reset the setInterval timer and stop
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(Interval);
    [msec, sec] = [0, 0];
    msecDisp.textContent = '00';
    secDisp.textContent = '00';
  });

  function startCounting() {
    msec += 1; // 10 ms = 0.01 s so +1 here (the msec not really in msec)
    if (msec <= 9) msecDisp.textContent = `0${msec}`;
    else if (msec <= 99) msecDisp.textContent = String(msec);
    else {
      msec = 0;
      msec.textContent = '00';
      sec += 1;
    }
    secDisp.textContent = sec <= 9 ? `0${sec}` : String(sec);
  }
};
