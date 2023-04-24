const start = document.getElementById("start")
const stop = document.getElementById("stop")

start.addEventListener("click", function(event) {
    event.preventDefault()
    countDown()
})

stop.addEventListener("click", function(event) {
    event.preventDefault()
})

function getTotalSecs(timer) {

    let [min, sec] = timer.split(":")
    let totalSecs = parseInt(min) * 60 + parseInt(sec)
    return totalSecs
}

function countDown() {
    const timer = document.getElementById("timer").innerText
    console.log(timer)
    let [min, sec] = timer.split(":")
    console.log(min)
    console.log(sec)

    setTimeout((min, sec) => {
        
        if (min === 0 && sec === 0) {
            const pomodoro = document.querySelector(".pomodoro")
            pomodoro.style.backgroundColor = "red"
            console.log("tto")
        }

    }, 1000)
}

getTotalSecs("25:00")

function ring() {

    const pomodoro = document.querySelector(".pomodoro")
    pomodoro.style.backgroundColor = "red"
}
