export class ClockController {
    constructor() {

        this.updateClock()
        setInterval(() => this.updateClock(), 100)
    }

    updateClock() {
        const now = new Date()
        let hours = now.getHours()
        let minutes = now.getMinutes()
        const amPm = hours >= 12 ? 'PM' : 'AM'

        hours = hours % 12
        hours = hours ? hours : 12


        minutes = minutes < 10 ? '0' + minutes : minutes;

        const clockElement = document.getElementById('clock')
        if (clockElement) {
            clockElement.textContent = `${hours}:${minutes} ${amPm}`
        }
    }
}
