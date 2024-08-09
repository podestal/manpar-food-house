interface Props {
    noAttention: string
}

const NoAttention = ({noAttention}: Props) => {
  return (
    <div className="w-[40%] mx-auto flex flex-col justify-center items-center gap-6">
        <h2 className="text-5xl text-center my-6">{noAttention}</h2> 
        <div className="text-center flex flex-col justify-center items-center gap-4">
            <h3 className="text-3xl text-slate-200">Horario de atención</h3>
            <h3 className="text-xl font-bold text-slate-300">Cevichería</h3>
            <div className="text-slate-300">
                <p>Martes a Domingo</p>
                <p>12:00 a 17:00</p>
            </div>
            <h3 className="text-xl font-bold">Bar</h3>
            <div className="text-slate-300">
                <p>Martes a Domingo</p>
                <p>19:00 a 23:00</p>
            </div>
        </div>
    </div>
  )
}

export default NoAttention