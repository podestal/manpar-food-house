import { Button } from '@tremor/react'
import InputText from '../../utils/InputText'
import useLogin from '../../hooks/auth/useLogin'
import { z } from 'zod'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"
import { useState } from 'react'
import { Callout } from '@tremor/react'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'

const schema = z.object({
    username: z.string().min(1, {message: 'El usuario es necesario'}),
    password: z.string().min(1, {message: 'Tiene que ingresar una contraseña'})
})

type FormData = z.infer<typeof schema>

const AuthForm = () => {

    // NAVIGATOR
    const navigate = useNavigate()

    //ERROR HANDLING
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [disable, setDisable] = useState(false)

    // FORM HANDLER
    const {register, handleSubmit, formState, reset} = useForm<FormData>({ resolver: zodResolver(schema) })

    const handleSuccess = (): void => {
        reset()
        setSuccess(true)
        setError(false)
        setDisable(true)
        navigate('/dishes')
    }

    const handleError = (): void => {
        setError(true)
    }

    // Mutation
    const login = useLogin(handleSuccess, handleError)

    const onSubmit = (data: FieldValues) => {
        login.mutate({username: data.username, password:data.password})
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-8 justify-center items-center">
        {error && 
            <motion.div
                initial={{opacity: 0, translateY: -100}}
                whileInView={{opacity: 1, translateY: 0}}
                transition={{duration: 0.8}}
            >
                <Callout title='Error' color='red'>Lo sentimos, ocurrión un error, inténtelo más tarde</Callout>
            </motion.div>
        }
        {success && <Callout title='Bienvenido' color='teal'>Un momento, lo estamos redireccionando</Callout>}
        <InputText 
            label="Usuario"
            type="text"
            register={register('username')}
            error={formState?.errors.username ? true : false} 
            errorMessage={formState.errors.username?.message}
        />
        <InputText 
            label="Contraseña"
            type="password"
            register={register('password')}
            error={formState?.errors.password ? true : false}
            errorMessage={formState.errors.password?.message}
        />
        <Button disabled={disable} color="blue">Ingresa</Button>
    </form>
  )
}

export default AuthForm