import { SelectItem, Select } from "@tremor/react"

interface Props<T> {
    setSelectItem: (cat: string) => void,
    itemsList: T[],
    allItems?: string
}

const Selector = <T extends {id: number | string, name: string}>({ setSelectItem, itemsList, allItems }: Props<T>) => {
  return (
    <Select className="w-[320px] max-lg:w-[200px] mx-auto text-center my-6" defaultValue="0" placeholder="Selecciona una categoría" onValueChange={value => setSelectItem(value)}>
        {allItems && <SelectItem value="0">{allItems}</SelectItem>}
        {itemsList.map( item => <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>)}
    </Select>
  )
}

export default Selector