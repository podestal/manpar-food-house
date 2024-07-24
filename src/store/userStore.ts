import { create } from "zustand"

interface AuthState {
    access: string | null
    refresh: string | null
    setTokens: (access: string, refresh: string) => void
    clearTokens: () => void
}

const useUserStore = create<AuthState>(set => ({
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    setTokens: (access, refresh) => {
        localStorage.setItem('access', access)
        localStorage.setItem('refresh', refresh)
        set({ access, refresh })
    },
    clearTokens: () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        set({ access: '', refresh: '' })
    },
}))

export default useUserStore