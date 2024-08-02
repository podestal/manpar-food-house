import { Button, Divider, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react"
import Panel from "../../utils/Panel"
import OrderCard from "./OrderCard"
import CreateOrder from "./CreateOrder"
import useGetOrders from "../../hooks/orders/useGetOrders"
import TotalOrderItems from "../orderItems/TotalOrderItems"
import { Table } from "../../services/api/tableService"

interface Props {
    show: boolean
    setShow: (value: boolean) => void
    table?: Table
}

const Orders = ({ show, setShow, table }: Props) => {
    
    if (!table) return null

    const {data, isLoading, isError, error} =  useGetOrders(table.id)

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
            <Button className="ml-10 lg:ml-16" color="red">Cerrar Mesa</Button>
            <TabPanels>
            <TabPanel>
            <div>
                {data?.map( order => (
                    <div
                        key={order.id} 
                    >
                    <OrderCard 
                        order={order}
                        table={table}
                    />
                    </div>
                ))}
                <Divider />
                <CreateOrder 
                    tableId={table.id}
                    orders={data}
                />
            </div>
            </TabPanel>
            <TabPanel>
                {table.bill && 
                <TotalOrderItems 
                    billId={table.bill}
                />}
            </TabPanel>
        </TabPanels>
        </TabGroup>

    </Panel>
  )
}

export default Orders