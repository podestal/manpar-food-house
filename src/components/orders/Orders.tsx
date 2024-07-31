import { Divider, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react"
import { Order } from "../../services/api/orderService"
import Panel from "../../utils/Panel"
import OrderCard from "./OrderCard"
import CreateOrder from "./CreateOrder"
import CreateOrderItem from "../orderItems/CreateOrderItem"
import useGetOrders from "../../hooks/orders/useGetOrders"

interface Props {
    show: boolean
    setShow: (value: boolean) => void
    tableId: number | undefined
}

const Orders = ({ show, setShow, tableId }: Props) => {
    
    if (!tableId) return null

    const {data, isLoading, isError, error} = useGetOrders(tableId)

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

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
                {data?.map( order => (
                    <div
                        key={order.id} 
                    >
                    <OrderCard 
                        order={order}
                        tableId={tableId}
                    />
                    {order.status === 'P' && 
                    <CreateOrderItem 
                        order={order}
                    />}
                    </div>
                ))}
                <Divider />
                <CreateOrder 
                    tableId={tableId}
                    orders={data}
                />
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