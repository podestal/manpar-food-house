import { Category } from "../../services/api/categoryServices"
import { SelectItem, Select } from "@tremor/react"

interface Props {
    setSelectedCategory: (cat: string) => void
    categories: Category[]
}

const CategoriesList = ({ setSelectedCategory, categories }: Props) => {
  return (
    <Select defaultValue="0" onValueChange={value => setSelectedCategory(value)}>
        <SelectItem value="0">Todas</SelectItem>
        {categories.map( category => <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>)}
    </Select>
  )
}

export default CategoriesList