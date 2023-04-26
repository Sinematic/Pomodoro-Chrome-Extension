const playBtn = document.getElementById("play")
const pauseBtn = document.getElementById("pause")
const stopBtn = document.getElementById("stop")

const pomodoro = document.querySelector(".pomodoro")
const timer = document.getElementById("timer")
let countdownTimeOut
let pomodoroCounter = 0

const list = document.querySelector(".pomodoro-list")
const ol = document.querySelector("ol")
const addPomodoroBtn = document.querySelector("#plus")
const settingsBtn = document.getElementById("settings")
const settingsModal = document.getElementById("modal")
const closeModal = document.getElementById("close")
const submitBtn = document.getElementById("submit-btn")

let pomodoroDefaultTime = "25:00"
let breakDefaultTime = "5:00"

addPomodoro()


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
        settingsModal.style.display = "none"

    } else errorMessage("Length must be between 1 and 60 minutes !", settingsModal)

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

    const testPomodoro = document.getElementById("current-pomodoro")
    console.log(testPomodoro)

    if (pomodoroCounter < 8) {

        pomodoroCounter += 1

        const newPomodoroDiv = document.createElement("div")
        const newPomodoro = document.createElement("li")
        newPomodoro.classList.add("pomodoro-list-item")
        newPomodoro.innerText = time
        ol.appendChild(newPomodoroDiv)
        newPomodoroDiv.classList.add("list-pomodoro-div")
        newPomodoroDiv.appendChild(newPomodoro)
    
        const trash = document.createElement("i")
        const trashSpan = document.createElement("span")
        trash.classList.add("fas", "fa-trash")
        newPomodoroDiv.appendChild(trashSpan)
        trashSpan.appendChild(trash)

        if (testPomodoro === null) {
            newPomodoro.setAttribute("id", "current-pomodoro")
        } else {
            console.log("toto")
        }

        trashSpan.addEventListener("click", () => {
            trashSpan.parentNode.remove()
            updateCurrentPomodoro()
        })

        handlePlaylist()

    } else errorMessage("Enough work for today !", list)
}

function errorMessage(messageContent, parentNode) {

    if (document.querySelector(".error-message")) {
        document.querySelector(".error-message").remove()
    }

    const message = document.createElement("div")
    message.classList.add("error-message")
    message.innerText = messageContent
    parentNode.appendChild(message)

    setTimeout(() => message.remove(), 3000)
    
}

function handlePlaylist() {

    const pomodoros = document.querySelectorAll(".pomodoro-list-item")
    let duration = []

    for (let i = 0; i < pomodoros.length; i++)
    {
        duration.push(pomodoros[i].innerText)
        console.log(duration[i])
    }
}

function updateCurrentPomodoro() {

    const pomodoros = document.querySelectorAll(".pomodoro-list-item")
    pomodoros[0].setAttribute("id", "current-pomodoro")
}