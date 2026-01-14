import { create } from "zustand";
import type { StateCreator } from "zustand";
import {
  Colors,
  Theme,
  type ColorValue,
  type ThemeValue,
} from "@/lib/styletypes";

interface SettingState {
  sidebar: boolean;
  color: ColorValue;
  theme: ThemeValue;
}

interface SettingAction {
  setSidebar: (sidebar: boolean) => void;
  setColor: (color: ColorValue) => void;
  setTheme: (theme: ThemeValue) => void;
}

type SettingStoreType = SettingState & SettingAction;

const SettingStore: StateCreator<SettingStoreType> = (set) => ({
  sidebar: false,
  color: Colors.Grey,
  theme: Theme.Normal,

  setSidebar: (sidebar: boolean) => set({ sidebar: sidebar }),
  setColor: (color: ColorValue) => set({ color: color }),
  setTheme: (theme: ThemeValue) => set({ theme: theme }),
});

const useSettingStore = create<SettingStoreType>(SettingStore);
export default useSettingStore;
