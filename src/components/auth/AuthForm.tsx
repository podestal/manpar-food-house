import { Button } from '@tremor/react'
import InputText from '../../utils/InputText'

const AuthForm = () => {
  return (
    <form className="w-full flex flex-col gap-8 justify-center items-center">
        <InputText 
            label="Usuario"
            type="text"
        />
        <InputText 
            label="Contraseña"
            type="password"
        />
        <Button color="blue">Ingresa</Button>
    </form>
  )
}

export default AuthForm