import { Category } from "../../services/api/categoryServices"
import { SelectItem, Select } from "@tremor/react"

interface Props {
    setSelectedCategory: (cat: string) => void
    categories: Category[]
}

const CategoriesList = ({ setSelectedCategory, categories }: Props) => {

  

  return (
    <Select className="w-[320px] mx-auto text-center" defaultValue="0" onValueChange={value => setSelectedCategory(value)}>
        <SelectItem value="0">Toda la Carta</SelectItem>
        {categories.map( category => <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>)}
    </Select>
  )
}

export default CategoriesList