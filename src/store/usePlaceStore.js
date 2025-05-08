import { create } from "zustand";

const usePlaceStore = create((set) => ({
  // 선택된 지역 (예: 서울, 부산 등)
  region: null,
  setRegion: (region) => set({ region }),

  // 선택된 카테고리 (예: 맛집, 카페 등)
  category: null,
  setCategory: (category) => set({ category }),

  // 추천 받은 장소 리스트 (LLM + Google API 결과)
  places: [],
  setPlaces: (places) => set({ places }),

  // 선택된 장소 (지도에서 강조할 때 등)
  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),
}));

export default usePlaceStore;
