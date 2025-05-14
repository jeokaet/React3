import { create } from "zustand";

const usePlaceStore = create((set) => ({
  // 📌 Step1: 날짜 저장
  tripDate: null,
  setTripDate: (date) => set({ tripDate: date }),

  // 📌 Step1: 지역 저장
  region: null,
  setRegion: (region) => set({ region }),

  // 📌 Step2: 추천 장소 리스트 저장 (API 결과)
  places: [],
  setPlaces: (places) => set({ places }),

  // 📌 선택된 장소들 (오른쪽 패널에 표시됨)
  selectedPlaces: [],
  setSelectedPlaces: (places) => set({ selectedPlaces: places }),

  // 📌 장소 추가 (중복 방지 포함)
  addPlace: (place) =>
    set((state) => {
      const already = state.selectedPlaces.some(
        (p) => p.name === place.name
      );
      if (already) return state;
      return {
        selectedPlaces: [...state.selectedPlaces, place],
      };
    }),

  // 📌 장소 제거
  removePlace: (name) =>
    set((state) => ({
      selectedPlaces: state.selectedPlaces.filter(
        (p) => p.name !== name
      ),
    })),

  // 📌 현재 진행 스텝
  step: 1,
  setStep: (step) => set({ step }),

  // 📌 패널 열림 여부 (슬라이드용)
  isSlideOpen: true,
  toggleSlide: () =>
    set((state) => ({
      isSlideOpen: !state.isSlideOpen,
    })),
}));

export default usePlaceStore;
