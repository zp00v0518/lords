class EventBus {
    $on(eventName, func) {
        window.addEventListener(eventName, func)
    }
    $off(eventName, func) {
        window.removeEventListener(eventName, func)
    }
    $emit(eventName) {
        const ev = new CustomEvent(eventName)
        window.dispatchEvent(ev)
    }
}

export default EventBus