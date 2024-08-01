interface Props {
    value: boolean
    setter: (value: boolean) => void
    label: string
}

const Swtich = ({ value, setter, label }: Props) => {

    const handleToggle = () => {
        setter(!value);
    };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-lg lg:text-xl text-slate-50 text-center">{label}</p>
        <div 
            className={`relative inline-block w-12 h-6 transition duration-200 ease-in 
                        ${value ? 'bg-blue-500' : 'bg-gray-300'} 
                        rounded-full cursor-pointer`}
            onClick={handleToggle}
            >
            <input 
                type="checkbox" 
                checked={value} 
                onChange={handleToggle} 
                className="sr-only peer" 
            />
            <div 
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md 
                            transition-transform duration-200 transform 
                            ${value ? 'translate-x-6' : 'translate-x-0'}`}
            ></div>
        </div>
    </div>
  )
}

export default Swtich