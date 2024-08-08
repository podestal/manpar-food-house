import { SelectItem, Select } from "@tremor/react"

interface Props<T> {
    setSelectItem: (cat: string) => void
    itemsList: T[]
    allItems?: string
    defaultItem?: string
    error?: boolean
    errorMessage?: string
    setError?: (value: string) => void
}

const Selector = <T extends {id?: number | string, name: string}>({ setSelectItem, itemsList, allItems, defaultItem, error, errorMessage, setError }: Props<T>) => {
  
  const handleValueChange = (value: string) => {
      if (error && setError) {
        setError('')
      }
      setSelectItem(value)
  }

  return (
    <Select 
        className="w-[300px] max-lg:w-[200px] mx-auto text-center my-6"
        error={error}
        errorMessage={errorMessage}
        defaultValue={defaultItem ? defaultItem : '0'} 
        placeholder="Selecciona" 
        onValueChange={handleValueChange}>
        {allItems && <SelectItem value="0">{allItems}</SelectItem>}
        {itemsList.map( item => {
          if (item.id) {
            return (
              <SelectItem key={item.id} value={item.id?.toString()}>{item.name}</SelectItem>
            )
          }
        })}
    </Select>
  )
}

export default Selector