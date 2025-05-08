import { create } from "zustand";

const usePlaceStore = create((set) => ({
  // 선택된 지역
  region: null,
  setRegion: (region) => set({ region }),

  // 선택된 카테고리
  category: null,
  setCategory: (category) => set({ category }),

  // 추천 장소 리스트
  places: [],
  setPlaces: (places) => set({ places }),

  // 지도에서 강조 중인 단일 장소
  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),

  // ✅ 선택된 장소들 (복수)
  selectedPlaces: [],
  setSelectedPlaces: (places) => set({ selectedPlaces: places }),

  // ✅ 스텝 상태
  step: 1,
  setStep: (step) => set({ step }),

  // ✅ SubPanel 열림 여부
  isPanelOpen: true,
  togglePanel: () =>
    set((state) => ({ isPanelOpen: !state.isPanelOpen })),
}));

export default usePlaceStore;
