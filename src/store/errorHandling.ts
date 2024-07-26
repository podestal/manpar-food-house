import { create } from 'zustand'

interface ErrorState {
    success: boolean
    error: boolean
    disable: boolean
    handleSuccess: () => void
    handleError: () => void
    handleReset: () => void
}

const useErrorHandler = create<ErrorState>(set => ({
    success: false,
    error: false,
    disable: false,
    handleSuccess: () => set({ success: true, error: false, disable: true }),
    handleError: () => set({ success: false, error: true, disable: false }),
    handleReset: () => set({ success: false, error: false, disable:false }),
}))

export default useErrorHandler