import { SelectItem, Select } from "@tremor/react"

interface Props<T> {
    setSelectItem: (cat: string) => void
    itemsList: T[]
}

const Selector = <T extends {id: number | string, name: string}>({ setSelectItem, itemsList }: Props<T>) => {
  return (
    <Select className="w-[320px] mx-auto text-center my-6" defaultValue="0" onValueChange={value => setSelectItem(value)}>
        <SelectItem value="0">Toda la Carta</SelectItem>
        {itemsList.map( item => <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>)}
    </Select>
  )
}

export default Selector