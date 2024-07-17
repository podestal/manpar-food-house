import { create } from "zustand"

interface DishImgStore {
    dishImg: string,
    select: (img: string) => void
}

const useDishImgStore = create<DishImgStore>(set => ({
    dishImg: 'https://images.unsplash.com/photo-1642773520998-7bc84e6afd80?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    select: (selectedImg: string) => set(() => ({dishImg: selectedImg}))
}))

export default useDishImgStore
