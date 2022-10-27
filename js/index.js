import Controls from "./controls.js"
import Timer from "./timer.js"
import { elements } from "./elements.js"
import Sounds from "./sounds.js"

const sounds = Sounds()

const {
    buttonPlay,
    buttonPause,
    buttonSet,
    buttonStop,
    buttonSoundOn,
    buttonSoundOff,
    displayMinutes,
    displaySeconds,
} = elements

const controls = Controls({
    buttonPlay,
    buttonPause,
    buttonSet,
    buttonStop,
    displayMinutes
})

const timer = Timer({
    displayMinutes,
    displaySeconds,
    setTimeout,
    resetControls: controls.reset,
})

buttonPlay.addEventListener('click', function() {
    controls.play()
    timer.countDown()
    sounds.buttonPressed()
})
buttonPause.addEventListener('click', function() {
    controls.pause()
    timer.hold()
    sounds.buttonPressed()
})
buttonStop.addEventListener('click', function() {
    controls.reset()
    timer.reset()
    sounds.buttonPressed()
})
buttonSoundOn.addEventListener('click', function() {
    buttonSoundOn.classList.add('hide')
    buttonSoundOff.classList.remove('hide')
    sounds.bgAudio.pause()
})
buttonSoundOff.addEventListener('click', function() {
    buttonSoundOn.classList.remove('hide')
    buttonSoundOff.classList.add('hide')
    sounds.bgAudio.play()
})
buttonSet.addEventListener('click', function() {
    let newMinutes = controls.getMinutes()

    if (!newMinutes) {
        timer.reset()
        return
    }
    timer.updateTimerDisplay(newMinutes, 0)
    timer.updateMinutes(newMinutes)
})