import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
        <Link to='/'>Home</Link>
        <Link to='/dishes'>Dishes</Link>
        <Link to='/categories'>Cats</Link>
    </div>
  )
}

export default Header