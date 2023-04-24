const playBtn = document.getElementById("play")
const pauseBtn = document.getElementById("pause")
const stopBtn = document.getElementById("stop")
const timer = document.getElementById("timer")

let countdownTimeOut

playBtn.addEventListener("click", (event) => {
    event.preventDefault()
    countdown()
    playBtn.style.display = "none"
    pauseBtn.style.display = "block"
})

pauseBtn.addEventListener("click", (event) => {
    event.preventDefault()
    stopCountdown()
    playBtn.style.display = "block"
    pauseBtn.style.display = "none"
})

stopBtn.addEventListener("click", (event) => {
    event.preventDefault()
    stopCountdown()
})

function getTotalSecs() {

    let [min, sec] = timer.innerText.split(":")
    let totalSecs = parseInt(min) * 60 + parseInt(sec)
    return totalSecs
}

function ring() {
    const pomodoro = document.querySelector(".pomodoro")
    pomodoro.style.backgroundColor = "red"
}

function formatTimer(totalSecs) {

    let minutes = Math.floor(totalSecs / 60)
    let seconds = totalSecs % 60
    timer.innerText =  `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

function countdown() {

    let timeLeft = getTotalSecs()
  
    if (timeLeft > 0) {
        
        timeLeft--;
        formatTimer(timeLeft)
        countdownTimeOut = setTimeout(countdown, 1000)

    } else ring()
}

function stopCountdown() {

    clearTimeout(countdownTimeOut)
    pomodoro.style.backgroundColor = "orange"
}