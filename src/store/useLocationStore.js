import { create } from 'zustand';

const useLocationStore = create((set) => ({
  latitude: null,
  longitude: null,
  setLocation: (lat, lng) => set({ latitude: lat, longitude: lng }),
}));

export default useLocationStore;