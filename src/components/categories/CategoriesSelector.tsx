import useGetCategories from "../../hooks/categories/useGetCategories"
import Selector from "../../utils/Selector"

interface Props {
    setSelectedCategory: (cat: string) => void
    allItems?: string
    defaultCat?: string
}

const CategoriesSelector = ({ setSelectedCategory, allItems, defaultCat }: Props) => {

    const {data: categories, isLoading, isError, error, isSuccess} = useGetCategories()

    if (isLoading) return <p>Loading ....</p>

    if (isError) return <p>{error.message}</p>

    if (isSuccess) 
  return (
    <Selector 
        setSelectItem={setSelectedCategory}
        itemsList={categories}
        allItems={allItems}
        defaultItem={defaultCat}
        
    />
  )
}

export default CategoriesSelector