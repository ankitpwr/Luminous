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
  fontSize: Number;
  letterSpacing: Number;
  lineHeight: Number;
  contrast: Number;
}

interface SettingAction {
  setSidebar: (sidebar: boolean) => void;
  setColor: (color: ColorValue) => void;
  setTheme: (theme: ThemeValue) => void;
  setSize: (
    fontsize: Number,
    lineHeight: Number,
    letterSpacing: Number
  ) => void;

  setContrast: (contrast: Number) => void;
}

type SettingStoreType = SettingState & SettingAction;

const SettingStore: StateCreator<SettingStoreType> = (set) => ({
  sidebar: false,
  color: Colors.Grey,
  theme: Theme.Normal,
  fontSize: 10,
  lineHeight: 9,
  letterSpacing: 1,
  contrast: 1.4,

  setSidebar: (sidebar: boolean) => set({ sidebar: sidebar }),
  setColor: (color: ColorValue) => set({ color: color }),
  setTheme: (theme: ThemeValue) => set({ theme: theme }),
  setSize: (fontsize: Number, lineHeight: Number, letterSpacing: Number) =>
    set({
      fontSize: fontsize,
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
    }),
  setContrast: (contrast: Number) => set({ contrast: contrast }),
});

const useSettingStore = create<SettingStoreType>(SettingStore);
export default useSettingStore;
