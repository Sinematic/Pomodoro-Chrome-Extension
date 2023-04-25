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
const settingsModal = document.getElementById("modal")
const closeModal = document.querySelector(".fa-xmark")
const submitBtn = document.getElementById("submit-btn")

let pomodoroDefaultTime = "25:00"


const pomodoroElement = document.createElement("li")
pomodoroElement.setAttribute("id", "current-pomodoro")
pomodoroElement.classList.add("pomodoro-list-item")
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

addPomodoroBtn.addEventListener("click", () => addPomodoro())

settingsBtn.addEventListener("click", () => settingsModal.style.display = "block")

closeModal.addEventListener("click", () => settingsModal.style.display = "none")

submitBtn.addEventListener("click", (event) => {

    event.preventDefault()
    const minutes = document.getElementById("minutes").value

    if (minutes > 0 && minutes <= 60) {
        addPomodoro(minutes + ":00")
    } else errorMessage()

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

function addPomodoro(time=pomodoroDefaultTime) {

    const newPomodoro = document.createElement("li")
    newPomodoro.classList.add("pomodoro-list-item")
    newPomodoro.innerText = time
    ol.appendChild(newPomodoro)
}

function errorMessage() {

    const message = document.querySelector(".error-message")

    if (message) {
        message.remove()

    } else {
        const message = document.createElement("div")
        message.classList.add("error-message")
        message.innerText = "Length must be between 1 and 60 minutes !"
        settingsModal.appendChild(message)

        setTimeout(() => message.remove(), 3000)
    }
}