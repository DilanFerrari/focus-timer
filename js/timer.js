import Sounds from "./sounds.js"

export default function Timer({
    displayMinutes,
    displaySeconds,
    setTimeout,
    resetControls,
}) {
    let minutes = displayMinutes.textContent
    let timerTimeOut
    function reset() {
        updateTimerDisplay(minutes, 0)
        clearTimeout(timerTimeOut)
    }
    function updateTimerDisplay(newMinutes, seconds) {
        newMinutes = newMinutes === undefined ? minutes : newMinutes
        seconds = seconds === undefined ? 0 : seconds
        displayMinutes.textContent = String(newMinutes).padStart(2, "0")
        displaySeconds.textContent = String(seconds).padStart(2, "0")
    }
    function countDown() {
        timerTimeOut = setTimeout(function() {
            let seconds = Number(displaySeconds.textContent)
            let minutes = Number(displayMinutes.textContent)
            updateTimerDisplay(minutes, 0)
            if (minutes <= 0 && seconds <= 0){
                resetControls()
                updateTimerDisplay()
                Sounds().timeEnd()
                return
            }
            if(seconds <= 0){
                seconds = 60
                --minutes
            }
            updateTimerDisplay(minutes, String(seconds - 1))
            countDown()
        }, 1000)
    } 
    function updateMinutes(newMinutes) {
        minutes = newMinutes
    }
    function hold () {
        clearTimeout(timerTimeOut)
    }
    return {
        countDown,
        updateTimerDisplay,
        hold,
        reset,
        updateMinutes
    }
}
