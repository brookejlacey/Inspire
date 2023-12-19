export class ClockController {
    constructor() {
        //FIXME clock updates too slow and is behind
        this.updateClock()
        setInterval(() => this.updateClock(), 60000)
        //wait until everything else loads
        // window.onload = () => {
        //     this.updateClock()
        // }
    }

    updateClock() {
        const now = new Date()
        let hours = now.getHours()
        let minutes = now.getMinutes()
        const amPm = hours >= 12 ? 'PM' : 'AM'

        // 12-hour format
        hours = hours % 12
        hours = hours ? hours : 12

        // Add leading zero to minutes if less than 10
        minutes = minutes < 10 ? '0' + minutes : minutes;

        const clockElement = document.getElementById('clock')
        if (clockElement) {
            clockElement.textContent = `${hours}:${minutes} ${amPm}`
        }
    }
}
