import useGetCategories from "../../hooks/categories/useGetCategories"
import CategoriesList from "./CategoriesList"

interface Props {
    selectedCategory: string
}

const Categories = ({ selectedCategory }: Props) => {

    const {data: categories, isLoading, isError, error, isSuccess} = useGetCategories()

    if (isLoading) return <p>Loading ....</p>

    if (isError) return <p>{error.message}</p>

    if (isSuccess) return (
    <div className="w-full">
        <h2 className="text-center text-4xl my-6">Nuestra Carta</h2>
        <CategoriesList 
            categories={categories}
            selectedCategory={selectedCategory}
        />
    </div>
  )
}

export default Categories