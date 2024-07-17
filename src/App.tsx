import { useEffect } from "react"
import axios from "axios"

const App = () => {

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/dishes/')
    .then(res => console.log(res.data))
  }, [])

  return (
    <h1 className="text-8xl font-bold">Hello World</h1>
  )
}

export default App
