import useGetCategories from "../../hooks/categories/useGetCategories"
import Selector from "../../utils/Selector"

interface Props {
    setSelectedCategory: (cat: string) => void
}

const CategoriesSelector = ({ setSelectedCategory }: Props) => {

    const {data: categories, isLoading, isError, error, isSuccess} = useGetCategories()

    if (isLoading) return <p>Loading ....</p>

    if (isError) return <p>{error.message}</p>

    if (isSuccess) 
  return (
    <Selector 
        setSelectItem={setSelectedCategory}
        itemsList={categories}
    />
  )
}

export default CategoriesSelector