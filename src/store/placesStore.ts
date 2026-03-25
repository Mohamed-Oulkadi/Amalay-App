import { create } from 'zustand';
import { mockPlaces } from '@/shared/lib/mockData';

type Place = (typeof mockPlaces)[number];

interface PlacesState {
  places: Place[];
  addPlace: (place: Place) => void;
}

export const usePlacesStore = create<PlacesState>((set) => ({
  places: [...mockPlaces],
  addPlace: (place) => set((state) => ({ places: [place, ...state.places] })),
}));
