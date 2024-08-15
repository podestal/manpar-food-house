import { useState } from "react"
import useDishImgStore from "../store/dishImgStore"
import CategoriesSelector from "../components/categories/CategoriesSelector"
import Categories from "../components/categories/Categories"
import DishImage from "../components/dishImg/DishImage"
import NoAttention from "../utils/NoAttention"
import CreateDish from "../components/dishes/CreateDish"
import CreateCategory from "../components/categories/CreateCategory"
import useUserStore from "../store/userStore"

const DishesPage = () => {

    const [selectedCategory, setSelectedCategory] = useState('0')
    const [noAttention, setNoAttention] = useState('')
    const dishId = useDishImgStore( s => s.dishId)
    const dishName = useDishImgStore( s => s.dishName)
    const access = useUserStore(s => s.access)

  return (
    <div className="relative min-h-screen w-full justify-evenly items-start flex flex-col">
        {
            noAttention.length > 0 
            ? 
            <NoAttention 
                noAttention={noAttention}   
            />
            : 
            <>
            <div className="w-full top-0 bg-slate-950 py-6 z-20 sticky">
                <DishImage 
                    dishId={dishId}
                    alt={dishName}
                />
                <CategoriesSelector 
                    setSelectedCategory={setSelectedCategory}
                    allItems="Toda la carta"
                    setNoAttention={setNoAttention}
                />
                {<div className="flex justify-center items-center z-10 gap-6 ">
                    {access && <CreateDish />}
                    {access && <CreateCategory />}
                </div>}
            </div>
            <Categories 
                selectedCategory={selectedCategory}
            />
            </>
        }
    </div>
  )
}

export default DishesPage