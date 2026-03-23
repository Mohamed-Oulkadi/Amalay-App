import { create } from 'zustand';

export interface TouristProfile {
  travelStyle: string;
  vibes: string[];
  fitnessLevel: string;
  budgetRange: string;
  languages: string[];
  tripDuration: string;
  completed: boolean;
}

interface ProfileState {
  profile: TouristProfile;
  setField: (field: keyof TouristProfile, value: any) => void;
  complete: () => void;
  reset: () => void;
}

const defaultProfile: TouristProfile = {
  travelStyle: '',
  vibes: [],
  fitnessLevel: '',
  budgetRange: '',
  languages: [],
  tripDuration: '',
  completed: false,
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: defaultProfile,
  setField: (field, value) => set((state) => ({
    profile: { ...state.profile, [field]: value },
  })),
  complete: () => set((state) => ({
    profile: { ...state.profile, completed: true },
  })),
  reset: () => set({ profile: defaultProfile }),
}));
