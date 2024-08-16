import { Category } from "../../services/api/categoryServices"
import CategoryCard from "./CategoryCard"

interface Props {
    selectedCategory: string
    categories: Category[]
}

// Function to determine if a category should be displayed based on the selected category
const shouldDisplayCategory = (category: Category, selectedCategory: string) => {
  return selectedCategory === '0' || category?.id?.toString() === selectedCategory
}

// Component responsible for rendering a list of categories based on the selected category
const CategoriesList = ({ selectedCategory, categories }: Props) => {

  // Render the list of CategoryCards, filtered by the selectedCategory
  return (
    <ul className="w-full">
      {categories
        // Filter categories: If '0' is selected, show all categories, otherwise filter by the selectedCategory
        .filter(category => shouldDisplayCategory(category, selectedCategory))
        // Render each category as a CategoryCard
        .map( category => 
          <CategoryCard 
            key={category.id} 
            category={category}
          />)}
    </ul>
  )
}

export default CategoriesList