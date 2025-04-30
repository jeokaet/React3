import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: sessionStorage.getItem("token") || null,
  setToken: (newToken) => {
    sessionStorage.setItem("token", newToken);
    set({ token: newToken });
  },
}));

export default useAuthStore;