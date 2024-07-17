import { Dish } from "../../services/api/dishServices"
import useDishImgStore from "../../store/dishImgStore"

interface Props {
    dish: Dish
}

const DishCard = ({ dish }: Props) => {

    const select = useDishImgStore(s => s.select)
    const handleSelectDish = () => {
        select(dish.picture)
    }

  return (
    <li onClick={handleSelectDish} className="cursor-pointer">
        <h2>{dish.name}</h2>
        <p>{dish.description}</p>
        <p>{dish.cost}</p>
    </li>
  )
}

export default DishCard