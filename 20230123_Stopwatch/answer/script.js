window.onload = function() {
    let seconds = 0;
    let tens = 0;
    const appendTens = document.getElementById("tens");
    const appendSeconds = document.getElementById("seconds");
    const btnStart = document.getElementById("button-start");
    const btnStop = document.getElementById("button-stop");
    const btnReset = document.getElementById("button-reset");
    let Interval;

    btnStart.onClick = function() {
        clearInterval(Interval);
        Interval = setInterval(startCounting, 10);
    }

    btnStop.onclick = function() {
        clearInterval(Interval);
    }

    btnReset.onClick = function() {
        clearInterval(Interval);
        [seconds, tens] = [0, 0];
        appendTens = "00";
        appendSeconds = "00";
    }

    function startCounting() {
        tens++;
        if (tens <= 9) appendTens.textContent = "0" + tens;
        else {
            if (tens == 100) {
                tens = 0;
                appendTens.textContent = "00";
                seconds++;
            }
            else appendTens.textContent = String(tens);
        }
        appendSeconds.textContent = ((seconds <= 9) ? "0" + seconds : String(seconds));
    }
}
