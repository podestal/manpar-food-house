import { create } from "zustand"

interface DishImgStore {
    dishId: number,
    dishName: string,
    select: (id: number, name: string) => void
}

const useDishImgStore = create<DishImgStore>(set => ({
    dishId: 0,
    dishName: '',
    select: (selectedDishId: number, selectedDishName: string) => set(() => ({ dishId: selectedDishId, dishName: selectedDishName }))
}))

export default useDishImgStore
