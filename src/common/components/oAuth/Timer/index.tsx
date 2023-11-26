import { FC } from 'react'
import { useState, useEffect } from 'react';

type ITimeType = {
    initialSeconds?: number;
    initialMinute?: number;
    timeIsDown: () => void
}

const Timer: FC<ITimeType> = (props) => {
    const { initialMinute = 0, initialSeconds = 0 } = props;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        setMinutes(initialMinute)
        setSeconds(initialSeconds)
    }, [initialMinute, initialSeconds])


    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    props.timeIsDown()
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });


    return (
        <div>
            <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
        </div>
    )
}

export default Timer;