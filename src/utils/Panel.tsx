import { RiCloseCircleLine } from "@remixicon/react"
import { DialogPanel, Dialog } from "@tremor/react"
import { Icon } from "@tremor/react"
import useErrorHandler from "../store/errorHandling"

interface Props {
    show: boolean
    setShow: (show: boolean) => void
    children: React.ReactNode
}

const Panel = ({ show, setShow, children }: Props) => {

    const handleReset = useErrorHandler(s => s.handleReset)

    const handleClose = () => {
        setShow(false)
        handleReset()
    }

  return (
    <Dialog
        open={show}
        onClose={handleClose}
    >
        <DialogPanel
            className="flex flex-col justify-center items-center gap-8"
        >
            <Icon onClick={handleClose}  className="absolute top-3 right-3 cursor-pointer hover:text-red-700" icon={RiCloseCircleLine} size="xl" color='red'/>
            {children}
        </DialogPanel>
    </Dialog>
  )
}

export default Panel