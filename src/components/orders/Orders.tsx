import { Divider, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react"
import Panel from "../../utils/Panel"
import OrderCard from "./OrderCard"
import CreateOrder from "./CreateOrder"
import useGetOrders from "../../hooks/orders/useGetOrders"
import TotalOrderItems from "../orderItems/TotalOrderItems"
import { Table } from "../../services/api/tableService"
import useGetOrderItems from "../../hooks/orderItem/useGetOrderItem"
import CloseTable from "./CloseTable"

interface Props {
    show: boolean
    setShow: (value: boolean) => void
    table?: Table
}

const Orders = ({ show, setShow, table }: Props) => {
    
    if (!table) return null

    const {data: orderItems, isLoading: orderItemsLoading, isError: orderItemsError, isSuccess: orderItemSuccess} = useGetOrderItems({billId: table.bill})

    const {data: orders, isLoading: orderLoading, isError: orderError, error, isSuccess: orderSuccess} =  useGetOrders(table.id)

    if (orderItemsLoading || orderLoading) return <p>Loading ...</p>

    if (orderItemsError || orderError) return <p>Error: {error?.message}</p>

    if (orderItemSuccess && orderSuccess)

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
            <>
            {table?.bill && 
            <CloseTable 
                billId={table.bill}
            />}
            </>
            <TabPanels>
            <TabPanel>
            <div>
                {orders?.map( order => (
                    <div
                        key={order.id} 
                    >
                    <OrderCard 
                        order={order}
                        table={table}
                        orderItems={orderItems}
                    />
                    </div>
                ))}
                <Divider />
                <CreateOrder 
                    tableId={table.id}
                    orders={orders}
                />
            </div>
            </TabPanel>
            <TabPanel>
                {table.bill && 
                <TotalOrderItems 
                    billId={table.bill}
                    orderItems={orderItems}
                />}
            </TabPanel>
        </TabPanels>
        </TabGroup>

    </Panel>
  )
}

export default Orders