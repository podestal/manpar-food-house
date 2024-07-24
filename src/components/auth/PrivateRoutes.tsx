import { Navigate } from "react-router-dom"
import useUserStore from "../../store/userStore"

interface Props {
    children: JSX.Element
}

const PrivateRoutes = ({ children }: Props) => {

    const access = useUserStore(s => s.access)
    console.log('access', access)
    

    if (!access) return <Navigate to='/login'/>

  return children
}

export default PrivateRoutes