import { Button, NumberInput, Tab, TabGroup, TabList, TabPanel, TabPanels, TextInput } from "@tremor/react"
import { Order } from "../../services/api/orderService"
import Panel from "../../utils/Panel"
import OrderCard from "./OrderCard"
import { RiSearch2Line } from "@remixicon/react"
import CreateOrder from "./CreateOrder"
import { Table } from "../../services/api/tableService"
import { useState } from "react"

interface Props {
    orders: Order[]
    show: boolean
    setShow: (value: boolean) => void
    tableId: number | undefined
}

const Orders = ({ orders, show, setShow, tableId }: Props) => {
    
    const [localOrders, setLocalOrders] = useState<Order[]>(orders)

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
                <Tab>Agregar Platos</Tab>
            </TabList>
            <TabPanels>
            <TabPanel>
            <div>
                {localOrders.length > 0
                ?
                localOrders.map( order => (
                    <OrderCard 
                        order={order}
                        key={order.id} />
                ))
                :
                <CreateOrder 
                    tableId={tableId}
                    setLocalOrders={setLocalOrders}
                />
                }
            </div>
            </TabPanel>
            <TabPanel>
            <form className="flex flex-col justify-center items-center gap-6">
            <h2 className="text-3xl text-slate-50">Agregar Plato</h2>
            <TextInput 
                placeholder="Plato"
                icon={RiSearch2Line}
            />
            <TextInput 
                placeholder="Observaciones"
            />
            <div className="flex flex-col justify-center items-center w-[300px] max-lg:w-[200px] gap-6">
                <p className="text-lg lg:text-xl text-slate-50 text-center">Cantidad</p>
                <NumberInput 
                    placeholder="Cantidad"
                />
            </div>
            <div className="w-full flex justify-center items-center gap-10 my-6">
                <Button color="blue">Agregar Plato</Button>
            </div>
        </form>
            </TabPanel>
        </TabPanels>
        </TabGroup>

    </Panel>
  )
}

export default Orders