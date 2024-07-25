import { RiCloseCircleLine } from "@remixicon/react"
import { DialogPanel, Dialog } from "@tremor/react"
import { Icon } from "@tremor/react"

interface Props {
    show: boolean
    setShow: (show: boolean) => void
    children: React.ReactNode
}

const Panel = ({ show, setShow, children }: Props) => {
  return (
    <Dialog
        open={show}
        onClose={() => setShow(false)}
    >
        <DialogPanel
            className="flex flex-col justify-center items-center gap-8"
        >
            <Icon onClick={() => setShow(false)}  className="absolute top-3 right-3 cursor-pointer hover:text-red-700" icon={RiCloseCircleLine} size="xl" color='red'/>
            {children}
        </DialogPanel>
    </Dialog>
  )
}

export default Panel