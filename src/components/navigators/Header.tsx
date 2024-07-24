import { useState } from "react"
import { Link } from "react-router-dom"
import { RiCloseCircleLine, RiMenu2Fill } from "@remixicon/react"
import { Icon } from "@tremor/react"
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {

  const [show, setShow] = useState(true)

  return (
    <>
      <Icon onClick={() => setShow(true)} className="hover:text-blue-700 cursor-pointer fixed top-0 right-0 m-6 z-40" icon={RiMenu2Fill} color='blue'/>
      <AnimatePresence>
        {
          show && 
          <motion.div 
            onClick={() => 
            setShow(false)} 
            initial={{opacity: 0, translateY: -200}}
            whileInView={{opacity: 1, translateY: 0}}
            exit={{opacity: 0, translateY: 200}}
            transition={{duration: 0.8}}
            className="text-xl fixed h-screen z-50 w-full flex flex-col justify-center items-center gap-12 bg-transparent backdrop-blur-xl overflow-scroll">
              <Icon className="cursor-pointer hover:text-red-700" icon={RiCloseCircleLine} size="xl" color='red'/>
              <Link to='/'><p className="hover:text-slate-400">Home</p></Link>
              <Link to='/dishes'><p>Dishes</p></Link>
              <Link to='/categories'><p>Cats</p></Link>
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default Header