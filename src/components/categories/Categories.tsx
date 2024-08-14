import useGetCategories from "../../hooks/categories/useGetCategories"
import useUserStore from "../../store/userStore"
import Loading from "../../utils/Loading"
import CreateDish from "../dishes/CreateDish"
import CategoriesList from "./CategoriesList"
import CreateCategory from "./CreateCategory"

interface Props {
    selectedCategory: string
}

const Categories = ({ selectedCategory }: Props) => {

    const access = useUserStore(s => s.access)

    const normalizeAccess = access ?? undefined
    
    const {data: categories, isLoading, isError, error, isSuccess} = useGetCategories(normalizeAccess)

    if (isLoading) return <Loading />

    if (isError) return <p>{error.message}</p>

    if (isSuccess) return (
    <div className="w-full">
        <div className="flex justify-center items-center gap-6 sticky">
            {access && <CreateDish />}
            {access && <CreateCategory />}
        </div>
        <h2 className="text-center text-4xl my-6">Nuestra Carta</h2>
        <CategoriesList 
            categories={categories}
            selectedCategory={selectedCategory}
        />
    </div>
  )
}

export default Categories