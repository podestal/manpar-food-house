import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
        <Link to='/'>Home</Link>
        <Link to='/dishes'>Dishes</Link>
    </div>
  )
}

export default Header