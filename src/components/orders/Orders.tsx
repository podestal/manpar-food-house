import { Button, Divider, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react"
import { Order } from "../../services/api/orderService"
import Panel from "../../utils/Panel"
import OrderCard from "./OrderCard"
import CreateOrder from "./CreateOrder"
import { useState } from "react"
import CreateOrderItem from "../orderItems/CreateOrderItem"

interface Props {
    orders: Order[]
    show: boolean
    setShow: (value: boolean) => void
    tableId: number | undefined
}

const Orders = ({ orders, show, setShow, tableId }: Props) => {
    
    const [localOrders, setLocalOrders] = useState<Order[]>(orders)
    const canCreateOrder = localOrders.find(order => order.status === 'P')

  return (
    <Panel
        show={show}
        setShow={setShow}
    >
        
        <TabGroup>
            <TabList 
                color={'blue'}
                variant="solid">
                <Tab>Ordenes</Tab>
                <Tab>Total</Tab>
            </TabList>
            <TabPanels>
            <TabPanel>
            <div>
                {localOrders?.map( order => (
                    <>
                    <OrderCard 
                        order={order}
                        key={order.id} 
                    />
                    {order.status === 'P' && 
                    <CreateOrderItem 
                        order={order}
                    />}
                    </>
                ))}
                <Divider />
                {!canCreateOrder ?
                <CreateOrder 
                    tableId={tableId}
                    setLocalOrders={setLocalOrders}
                />
                :
                <div className="w-full flex justify-center items-center">
                    <Button color="blue" disabled={true}>Nueva Orden</Button>
                </div>
                }
            </div>
            </TabPanel>
            <TabPanel>
                Total
            </TabPanel>
        </TabPanels>
        </TabGroup>

    </Panel>
  )
}

export default Orders