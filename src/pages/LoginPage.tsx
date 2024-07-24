import AuthForm from "../components/auth/AuthForm"

const LoginPage = () => {
  return (
    <div className="min-h-screen lg:max-w-[1280px] mx-auto flex flex-col justify-center items-center">
        <h2 className="text-6xl my-10">Ingresar</h2>
        <AuthForm />
    </div>
  )
}

export default LoginPage