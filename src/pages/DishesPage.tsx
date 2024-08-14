import { useState } from "react"
import useDishImgStore from "../store/dishImgStore"
import CategoriesSelector from "../components/categories/CategoriesSelector"
import Categories from "../components/categories/Categories"
import DishImage from "../components/dishImg/DishImage"
import NoAttention from "../utils/NoAttention"

const DishesPage = () => {

    const [selectedCategory, setSelectedCategory] = useState('0')
    const [noAttention, setNoAttention] = useState('')
    const dishId = useDishImgStore( s => s.dishId)
    const dishName = useDishImgStore( s => s.dishName)

  return (
    <div className="relative min-h-screen w-full justify-evenly items-start flex flex-col">
        <>{console.log('noAttention', noAttention)}</>
        {
            noAttention.length > 0 
            ? 
            <NoAttention 
                noAttention={noAttention}   
            />
            : 
            <>
            <div className="w-full top-0 bg-slate-950 py-6 z-20 fixed">
                <DishImage 
                    dishId={dishId}
                    alt={dishName}
                />
                <CategoriesSelector 
                    setSelectedCategory={setSelectedCategory}
                    allItems="Toda la carta"
                    setNoAttention={setNoAttention}
                />
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