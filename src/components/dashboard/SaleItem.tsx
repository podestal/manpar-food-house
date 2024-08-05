import { MergeData } from "./OrderItems"

interface Props {
    formattedDish:MergeData
}

const SaleItem = ({ formattedDish }: Props) => {
  return (
    <div className="px-10 py-10 grid grid-cols-4 text-center gap-6 hover:bg-slate-800 rounded-3xl">
        <h2 className="text-2xl text-left col-span-2">{formattedDish.dishName}</h2>
        <p className="">{formattedDish.soldQuantity} Uds</p>
        <p className=" text-green-500 font-bold text-right">S/. {(formattedDish.sales).toFixed(2)}</p>
    </div>
  )
}

export default SaleItem