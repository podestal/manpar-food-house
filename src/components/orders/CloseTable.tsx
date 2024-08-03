import useRemoveBill from '../../hooks/bills/useRemoveBill'
import { Button } from '@tremor/react'
import useUserStore from '../../store/userStore'

interface Props {
    billId: number
}

const CloseTable = ({ billId }: Props) => {

    const removeBill = useRemoveBill(billId)
    const access = useUserStore(s => s.access)

    const handleRemoveBill = () => {
        if (access) {
            removeBill.mutate({access})
        }
    }

  return (
    <Button onClick={handleRemoveBill} className="ml-10 lg:ml-16" color="red">Cerrar Mesa</Button>
  )
}

export default CloseTable