const playBtn = document.getElementById("play")
const pauseBtn = document.getElementById("pause")
const stopBtn = document.getElementById("stop")

const pomodoro = document.querySelector(".pomodoro")
const timer = document.getElementById("timer")
let countdownTimeOut

const list = document.querySelector(".pomodoro-list")
const ol = document.querySelector("ol")
const addPomodoroBtn = document.querySelector(".fa-plus")
const settingsBtn = document.querySelector(".fa-gear")

let pomodoroDefaultTime = "25:00"


const pomodoroElement = document.createElement("li")
pomodoroElement.setAttribute("id", "current-pomodoro")
pomodoroElement.innerText = timer.innerText
ol.appendChild(pomodoroElement)

playBtn.addEventListener("click", (event) => {
    event.preventDefault()
    countdown()
    updateInterface("#8BC34A")
})

pauseBtn.addEventListener("click", (event) => {
    event.preventDefault()
    pauseCountdown()
})

stopBtn.addEventListener("click", (event) => {
    event.preventDefault()
    stopCountdown()
})

addPomodoroBtn.addEventListener("click", () => {

    const newPomodoro = document.createElement("li")
    newPomodoro.classList.add("pomodoro-list-item")
    newPomodoro.innerText = pomodoroDefaultTime
    ol.appendChild(newPomodoro)
})

function getTotalSecs() {

    let [min, sec] = timer.innerText.split(":")
    let totalSecs = parseInt(min) * 60 + parseInt(sec)
    return totalSecs
}

function formatTimer(totalSecs) {

    let minutes = Math.floor(totalSecs / 60)
    let seconds = totalSecs % 60
    timer.innerText =  `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

function countdown() {

    let timeLeft = getTotalSecs()
    
    playBtn.style.display = "none"
    pauseBtn.style.display = "block"
  
    if (timeLeft > 0) {
        
        timeLeft--;
        formatTimer(timeLeft)
        countdownTimeOut = setTimeout(countdown, 1000)

    } else ring()

}

function pauseCountdown() {

    clearTimeout(countdownTimeOut)
    playBtn.style.display = "block"
    pauseBtn.style.display = "none"
    updateInterface("blue")
}

function stopCountdown() {

    clearTimeout(countdownTimeOut)
    timer.innerText = "25:00"
    playBtn.style.display = "block"
    pauseBtn.style.display = "none"
    updateInterface("orange")
}

function ring() {
    updateInterface("red")
    playBtn.style.display = "block"
    pauseBtn.style.display = "none"
    timer.innerText = "25:00"
}

function updateInterface(color="green") {
    
    pomodoro.style.backgroundColor = color
    pomodoro.style.borderColor = color
    playBtn.style.borderColor = color
    pauseBtn.style.borderColor = color
    stopBtn.style.borderColor = color
    timer.style.borderColor = color
}
