import { Bars } from "react-loader-spinner"

const Loading = () => {
  return (
    <div className='absolute top-0 left-0 z-[100] w-full h-full flex flex-col items-center justify-center gap-6'>
        <p className='lg:text-4xl text-slate-50 font-montserrat'>Un momento porfavor</p>
        <Bars
            color="blue"
            ariaLabel="loading" 
            height="140"
            width="140"
        />
    </div>
  )
}

export default Loading