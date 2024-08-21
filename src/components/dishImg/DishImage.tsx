import useGetDishImage from "../../hooks/dishImages/useGetDishImage"

interface Props {
    dishId: number | undefined
    alt: string | undefined
}

const DishImage = ({ dishId, alt }: Props) => {

    if(!dishId || !alt) return null

    const {data: img, isLoading, isError, error, isSuccess} = useGetDishImage(dishId)

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div className="flex flex-col justify-center items-center sticky z-30 overflow-hidden">
        <img className="sticky z-30 object-cover my-10 max-md:w-[280px] h-[200px] lg:h[260px] lg:w-[360px] rounded-3xl" src={img[0]?.image} alt={alt}  />
    </div>
  )
}

export default DishImage