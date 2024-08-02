import OrdersKitchen from "../components/orders/OrdersKitchen"

const Orders = () => {
  return (
    <div className="min-h-screen">
        <h2 className="text-6xl py-10 lg:py-20 text-center">Cocina</h2>
        <OrdersKitchen />
    </div>
  )
}

export default Orders