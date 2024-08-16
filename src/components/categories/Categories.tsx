import useGetCategories from "../../hooks/categories/useGetCategories"
import useUserStore from "../../store/userStore"
import Loading from "../../utils/Loading"
import CategoriesList from "./CategoriesList"

interface Props {
    selectedCategory: string
}

// Function component for displaying categories
const Categories = ({ selectedCategory }: Props) => {

    // Fetching access token or identifier from the user store
    const access = useUserStore(s => s.access)

    // Normalize access to undefined if it's null or falsy
    const normalizeAccess = access ?? undefined
    
    // Fetch categories data using the custom hook with the normalized access token
    const {data: categories, isLoading, isError, error, isSuccess} = useGetCategories(normalizeAccess)

    // Render component
    return (
    
    <div className="w-full">
        <h2 className="text-center text-4xl my-6">Nuestra Carta</h2>
        {isLoading && <Loading />}
        {isError && <p>Error: {error?.message}</p>}
        {isSuccess &&
            <CategoriesList 
                categories={categories}
                selectedCategory={selectedCategory}
            />
        }

    </div>
  )
}

export default Categories