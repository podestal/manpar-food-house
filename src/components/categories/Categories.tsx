import useGetCategories from "../../hooks/categories/useGetCategories"
import CategoriesList from "./CategoriesList"

interface Props {
    setSelectedCategory: (cat: string) => void
}

const Categories = ({ setSelectedCategory }: Props) => {

    const {data: categories, isLoading, isError, error, isSuccess} = useGetCategories()

    if (isLoading) return <p>Loading ....</p>

    if (isError) return <p>{error.message}</p>

    if (isSuccess) return (
    <div>
        <h2 className="text-center text-4xl my-6">Categorías</h2>
        <CategoriesList 
            categories={categories}
            setSelectedCategory={setSelectedCategory}
        />
    </div>
  )
}

export default Categories