import { useEffect } from "react"
import useGetCategories from "../../hooks/categories/useGetCategories"
import useUserStore from "../../store/userStore"
import Selector from "../../utils/Selector"

interface Props {
    setSelectedCategory: (cat: string) => void
    allItems?: string
    defaultCat?: string
    error?: string
    errorSetter?: (value: string) => void
    setNoAttention?: (value: string) => void
}

// Component responsible for rendering a category selector, with loading, error handling, and setting default selections
const CategoriesSelector = ({ 
    setSelectedCategory, 
    allItems, 
    defaultCat, 
    error, 
    errorSetter, 
    setNoAttention 
  }: Props) => {

    // Access token or credentials retrieved from the user's store
    const access = useUserStore(s => s.access)

    // Normalize access token to undefined if it doesn't exist
    const normalizeAccess = access ?? undefined

    // Fetch categories using the custom hook, handling different states like loading, error, and success
    const {data: categories, isError, error: catError, isSuccess} = useGetCategories(normalizeAccess)

    // Effect that runs when categories data changes, setting attention messages based on the availability of categories
    useEffect(() => {
      if (categories) {
        if (categories.length === 0) {
          setNoAttention && setNoAttention('Por ahora no Estamos atendiendo')
        } else {
          setNoAttention && setNoAttention('')
        }
      }
    }, [categories, setNoAttention])

    // Render error message if there's an issue fetching categories
    if (isError) return <p>{catError.message}</p>

    // Render the Selector component once categories have been successfully fetched
    if (isSuccess) 
  return (
    <div className="">
      <Selector 
          setSelectItem={setSelectedCategory}
          itemsList={categories}
          allItems={allItems}
          defaultItem={defaultCat}
          error={error && error.length > 0 ? true : false}
          errorMessage={error}
          setError={errorSetter}
      />
    </div>
  )

  // Fallback return to avoid missing return statement
  return null
}

export default CategoriesSelector