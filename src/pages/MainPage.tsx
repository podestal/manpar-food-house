import { Outlet } from "react-router-dom"
import Header from "../components/navigators/Header"
import { useEffect } from "react"
import isTokenExpired from "../utils/isTokenExpired"
import useUserStore from "../store/userStore"

const MainPage = () => {

  const {access, clearTokens} = useUserStore()

  useEffect(() => {
    if(access) {
      if (isTokenExpired(access)) {
        // clearTokens()
      }
    }
  }, [])

  return (
    <div className="text-slate-50 bg-slate-950">
        <Header />
        <Outlet />
    </div>
  )
}

export default MainPage