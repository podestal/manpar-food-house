import { TextInput, TextInputProps } from "@tremor/react"

interface Props extends TextInputProps {
    label: string,
}

const InputText = ({ label, ...TextInputProps }: Props) => {

  return (
    <div className="flex flex-col justify-center items-center w-[300px] max-lg:w-[200px] gap-6">
        <p className="text-lg lg:text-xl text-slate-50 text-center">{label}</p>
        <TextInput 
            placeholder={label}
            {...TextInputProps}
        />
    </div>
  )
}

export default InputText