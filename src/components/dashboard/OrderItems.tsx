import useGetOrderItems from "../../hooks/orderItem/useGetOrderItem"

const OrderItems = () => {

    const {} = useGetOrderItems({})

  return (
    <div>OrderItems</div>
  )
}

export default OrderItems