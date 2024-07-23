import { Category } from "../../services/api/categoryServices"
import CategoryCard from "./CategoryCard"

interface Props {
    selectedCategory: string
    categories: Category[]
}

const CategoriesList = ({ selectedCategory, categories }: Props) => {

  return (
    <ul>
      <>{console.log('selectedCategory', selectedCategory)}</>
      {categories
        .filter( category => selectedCategory === '0' ? category : (category.id).toString() === selectedCategory)
        .map( category => 
          <CategoryCard 
            key={category.id} 
            category={category}
          />)}
    </ul>
  )
}

export default CategoriesList