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
    <li onClick={handleSelectDish} className="max-lg:w-[460px] flex flex-col justify-center items-center gap-8 cursor-pointer">
        <div className="w-full flex justify-between items-center gap-6 hover:bg-slate-900 px-6 py-4 rounded-3xl">
            <h2>{dish.name}</h2>
            <p>{dish.cost}</p>
        </div>
        {showDescription &&
            <div className="flex justify-start px-6">
                <p className="text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi veritatis suscipit velit unde quas alias aliquam neque, voluptatem repellendus est sapiente saepe maiores animi eligendi ipsum temporibus, consequatur laborum debitis!</p>
            </div>
        }
    </li>
  )
}

export default DishCard