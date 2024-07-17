import { Outlet } from "react-router-dom"
import Header from "../components/navigators/Header"

const MainPage = () => {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}

export default MainPage