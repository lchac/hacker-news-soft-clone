export function formatDatetime(timestamp) {
    if (timestamp) {
        const dateTime = new Date(timestamp * 1000)
        return dateTime.toLocaleDateString() + ', ' + dateTime.toLocaleTimeString()
    } else {
        return 'Unkwown Date'
    }
}