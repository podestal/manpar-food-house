import useGetCategories from "../../hooks/categories/useGetCategories"
import useUserStore from "../../store/userStore"
import Selector from "../../utils/Selector"

interface Props {
    setSelectedCategory: (cat: string) => void
    allItems?: string
    defaultCat?: string
    error?: string
    errorSetter?: (value: string) => void
}

const CategoriesSelector = ({ setSelectedCategory, allItems, defaultCat, error, errorSetter }: Props) => {

    const access = useUserStore(s => s.access)

    const normalizeAccess = access ?? undefined

    const {data: categories, isLoading, isError, error: catError, isSuccess} = useGetCategories(normalizeAccess)

    if (isLoading) return <p>Loading ....</p>

    if (isError) return <p>{catError.message}</p>

    if (isSuccess) 
  return (
    <div>
      <p className="text-lg lg:text-xl text-slate-50 text-center">Categoría</p>
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
}

export default CategoriesSelector