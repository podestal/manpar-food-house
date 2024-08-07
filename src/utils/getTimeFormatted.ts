interface Props {
    miliSeconds: number
}

const formattedTime = ({miliSeconds}: Props) => {
    const totalSeconds = Math.floor(miliSeconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    let summary = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

    if (hours) {
        summary = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    const time = {
        hours,
        minutes,
        seconds,
        summary,
    }
    
    return time
}

export default formattedTime