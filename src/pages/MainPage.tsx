import { Outlet } from "react-router-dom"
import Header from "../components/navigators/Header"

const MainPage = () => {
  return (
    <div className="text-slate-50 bg-slate-950">
        <Header />
        <Outlet />
    </div>
  )
}

export default MainPage