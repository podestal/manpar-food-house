import { DialogPanel, Dialog } from "@tremor/react"

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
            {children}
        </DialogPanel>
    </Dialog>
  )
}

export default Panel