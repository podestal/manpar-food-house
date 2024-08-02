import { useState } from "react"
import { Dish } from "../../services/api/dishServices"
import useDishImgStore from "../../store/dishImgStore"
import UpdateDish from "./UpdateDish"
import RemoveDish from "./RemoveDish"
import useUserStore from "../../store/userStore"
import { motion } from "framer-motion"

interface Props {
    dish: Dish
}

const DishCard = ({ dish }: Props) => {

    // AUTH
    const access = useUserStore(s => s.access)

    const select = useDishImgStore(s => s.select)
    const [showDescription, setShowDescription] = useState(false)
    const [show, setShow] = useState(false)

    const handleSelectDish = () => {
        if (!access) {
            dish.id && select(dish.id, dish.name)
            setShowDescription(prev => !prev)
        } else {
            setShow(true)
        }
    }

  return (
    <motion.li 
        initial={{opacity: 0, translateY: -60}}
        whileInView={{opacity: 1, translateY: 0}}
        transition={{duration: 0.8}}
        className={`mx-auto max-w-[1280px] max-lg:w-[460px] w-full flex flex-col justify-center items-center gap-8 cursor-pointer ${!dish.available && 'line-through decoration-red-500 decoration-4'}`}>
        <div className="flex w-full gap-4">
            {access && <RemoveDish dish={dish} />}
            {access && <UpdateDish show={show} setShow={setShow} dish={dish} />}
            <div onClick={handleSelectDish}  className="w-full flex justify-between items-center gap-6 hover:bg-slate-900 px-6 py-4 rounded-3xl">
                <h2 className="text-xl font-bold">{dish.name}</h2>
                <p className="font-bold">{dish.cost}</p>
            </div>
        </div>
        {showDescription &&
            <div className="flex justify-start px-6">
                <p className="text-slate-400 text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi veritatis suscipit velit unde quas alias aliquam neque, voluptatem repellendus est sapiente saepe maiores animi eligendi ipsum temporibus, consequatur laborum debitis!</p>
            </div>
        }
    </motion.li>
  )
}

export default DishCard