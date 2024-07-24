import { useState } from "react"
import { Dish } from "../../services/api/dishServices"
import useDishImgStore from "../../store/dishImgStore"

interface Props {
    dish: Dish
}

const DishCard = ({ dish }: Props) => {

    const select = useDishImgStore(s => s.select)
    const [showDescription, setShowDescription] = useState(false)

    const handleSelectDish = () => {
        select(dish.picture)
        setShowDescription(prev => !prev)
    }

  return (
    <li onClick={handleSelectDish} className="mx-auto max-w-[1280px] max-lg:w-[460px] w-full flex flex-col justify-center items-center gap-8 cursor-pointer">
        <div className="w-full flex justify-between items-center gap-6 hover:bg-slate-900 px-6 py-4 rounded-3xl">
            <h2 className="text-xl font-bold">{dish.name}</h2>
            <p className="font-bold">{dish.cost}</p>
        </div>
        {showDescription &&
            <div className="flex justify-start px-6">
                <p className="text-slate-400 text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi veritatis suscipit velit unde quas alias aliquam neque, voluptatem repellendus est sapiente saepe maiores animi eligendi ipsum temporibus, consequatur laborum debitis!</p>
            </div>
        }
    </li>
  )
}

export default DishCard