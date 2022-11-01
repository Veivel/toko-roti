import create from 'zustand'

export const useGlobalStore = create(set => ({
    accessToken: 'none',
    setAccessToken: (token) => set({ accessToken: token}),
}));