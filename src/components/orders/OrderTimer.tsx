import { useEffect, useState } from "react"
import { Order } from "../../services/api/orderService"
import formattedTime from "../../utils/getTimeFormatted"

interface Props {
    order: Order
    setBackground: (value: string) => void
}

const OrderTimer = ({ order, setBackground }: Props) => {

    const [timePassed, setTimePassed] = useState(0)
    const time = formattedTime({miliSeconds: timePassed})
    


    useEffect(() => {
        if (order.updated_at) {
            const orderUpdatedTime = new Date(order.updated_at).getTime()
            const updateTimePassed = () => {
                const currentTime = Date.now()
                const timeDifference = currentTime - orderUpdatedTime
                setTimePassed(timeDifference)
            }

            updateTimePassed()

            const intervalId = setInterval(updateTimePassed, 1000)

            return () => clearInterval(intervalId)
        }
        
    }, [order.created_at])

    useEffect(() => {
        if (time.minutes <= 10 && time.minutes > 5) {
            setBackground('yellow-500')
        } else if (time.minutes <= 16 && time.minutes > 10) {
            setBackground('amber-500')
        } else if (time.minutes > 16) {
            setBackground('red-500')
        }
    }, [time.minutes])

  return (
    <p className="text-4xl">{time.summary}</p>
  )
}

export default OrderTimer