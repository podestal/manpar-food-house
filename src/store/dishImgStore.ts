import { create } from "zustand"

interface DishImgStore {
    dishImg: string,
    select: (img: string) => void
}

const useDishImgStore = create<DishImgStore>(set => ({
    dishImg: 'https://scontent.flim13-1.fna.fbcdn.net/v/t39.30808-6/448602260_122098068656371633_2367658667549369097_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ueY470m6DHcQ7kNvgFhFh17&_nc_ht=scontent.flim13-1.fna&oh=00_AYB6Y1XTceB1I4m7R7hVZAwAIUb6v8N3D_pF6QkONCnZNA&oe=669DDAA1',
    select: (selectedImg: string) => set(() => ({dishImg: selectedImg}))
}))

export default useDishImgStore
