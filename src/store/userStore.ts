import { create } from "zustand"

interface User {
    email: string,
    id: number,
    username: string
}

interface AuthState {
    access: string | null
    refresh: string | null
    user: User | null
    setTokens: (access: string, refresh: string) => void
    setUser: (user: User) => void
}

const useUserStore = create<AuthState>(set => ({
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    user: null,
    setTokens: (access, refresh) => {
        localStorage.setItem('access', access)
        localStorage.setItem('refresh', refresh)
        set({ access, refresh })
    },
    clearTokens: () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
    },
    setUser: (user) => set({ user })
}))

export default useUserStore