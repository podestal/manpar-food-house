import { MergeData } from "./OrderItems"

interface Props {
    formattedDish:MergeData
}

const SaleItem = ({ formattedDish }: Props) => {
  return (
    <div className="px-10 py-10 max-md:flex max-md:flex-col  grid lg:grid-cols-4 md:grid-cols-3 text-center gap-6 hover:bg-slate-800 rounded-3xl mx-8">
        <h2 className="text-3xl lg:text-2xl md:text-left lg:col-span-2">{formattedDish.dishName}</h2>
        <p className="">{formattedDish.soldQuantity} Uds</p>
        <p className=" text-green-500 font-bold md:text-right">S/. {(formattedDish.sales).toFixed(2)}</p>
    </div>
  )
}

export default SaleItem