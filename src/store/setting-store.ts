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
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  contrast: number;
  colorTheme: boolean;
}

interface SettingAction {
  setSidebar: (sidebar: boolean) => void;
  setColor: (color: ColorValue) => void;
  setTheme: (theme: ThemeValue) => void;
  setSize: (
    fontsize: number,
    lineHeight: number,
    letterSpacing: number,
  ) => void;

  setContrast: (contrast: number) => void;
  setColorTheme: (colorTheme: boolean) => void;
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
  colorTheme: false,

  setSidebar: (sidebar: boolean) => set({ sidebar: sidebar }),
  setColor: (color: ColorValue) => set({ color: color }),
  setTheme: (theme: ThemeValue) => set({ theme: theme }),
  setSize: (fontsize: number, lineHeight: number, letterSpacing: number) =>
    set({
      fontSize: fontsize,
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
    }),
  setContrast: (contrast: number) => set({ contrast: contrast }),
  setColorTheme: (colorTheme: boolean) => set({ colorTheme: colorTheme }),
});

const useSettingStore = create<SettingStoreType>(SettingStore);
export default useSettingStore;
