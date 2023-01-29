window.onload = function () {
  // Import constants and initialize global var
  const msec = 0;
  const sec = 0;
  const msecDisp = document.querySelector('span#milliseconds');
  const secDisp = document.querySelector('span#seconds');
  const startBtn = document.querySelector('button#start');
  const stopBtn = document.querySelector('button#stop');
  const resetBtn = document.querySelector('button#reset');
  let Interval;

  startBtn.addEventListener('click', () => {
    clearInterval(Interval);
    setInterval(startCounting, 10); // Implement startCounting every 0.1 ms
  });

  function startCounting() {}
};
