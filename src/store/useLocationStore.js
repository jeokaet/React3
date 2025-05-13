import { create } from 'zustand';

const useLocationStore = create((set) => ({
  latitude: null,
  setLatitude: (lat) => set({latitude: lat}),

  longitude: null,
  setLongitude: (lng) => set({longitude: lng}),

  location: null,
  setLocation: (lat, lng) => set({ latitude: lat, longitude: lng }),

  
  // 시작 위치 정보
  startingPoint : null,
  setStartingPoint: (location) => set({startingPoint:location}),

  // 날짜 정보
  tripDate : null,
  setTripDate: (selectedDate) => set({tripDate:selectedDate}),

}));

export default useLocationStore;