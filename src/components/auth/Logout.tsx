import { Button } from "@tremor/react"
import useUserStore from "../../store/userStore"

interface Props {
    setShow: (show: boolean) => void
}

const Logout = ({ setShow }: Props) => {

    const logout = useUserStore(s => s.clearTokens)

    const handleLogout = () => {
        setShow(false)
        logout()
    }

  return (
    <Button onClick={handleLogout} color="red">Salir</Button>
  )
}

export default Logout