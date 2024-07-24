import { Button } from '@tremor/react'
import InputText from '../../utils/InputText'
import { useState } from 'react'
import useLogin from '../../hooks/auth/useLogin'

const AuthForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Mutation
    const login = useLogin()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login.mutate({username, password})
    }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 justify-center items-center">
        <InputText 
            label="Usuario"
            type="text"
            value={username}
            onValueChange={ value => setUsername(value)}
        />
        <InputText 
            label="Contraseña"
            type="password"
            value={password}
            onValueChange={ value => setPassword(value)}
        />
        <Button color="blue">Ingresa</Button>
    </form>
  )
}

export default AuthForm