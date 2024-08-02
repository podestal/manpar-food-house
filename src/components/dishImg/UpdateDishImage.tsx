import useUpdateDishImage from "../../hooks/dishImages/useUpdateDishImage"
import { Dish } from "../../services/api/dishServices"
import useUserStore from "../../store/userStore"

interface Props {
    dish: Dish
    dishImageId: number
    preview: string | null
    setPreview: (img: string | null) => void
}

const UpdateDishImage = ({ dish, dishImageId, preview, setPreview }: Props) => {

    if (!dish.id || !dishImageId) return null

    const access = useUserStore(s => s.access)
    const updateDishImage = useUpdateDishImage(dish.id, dishImageId)

  return (
    <div className="flex flex-col items-center">
        {preview && (
            <img 
                src={preview} 
                alt="Selected Image" 
                className="my-10 w-[280px] h-[200px] lg:w-[360px] lg:h-[220px] rounded-3xl"
            />
        )}
        <input 
            id="file-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={e => {
                if (e.target.files) {
                    const formData = new FormData()
                    formData.append('image', e.target.files[0])
                    setPreview(URL.createObjectURL(e.target.files[0]))
                    if (access) {
                        updateDishImage.mutate({ dishImage: formData, access })
                    }
                }
            }}
        />
        <label 
            htmlFor="file-upload" 
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
            {'Cambia de Imagen'}
        </label>
    </div>
  )
}

export default UpdateDishImage