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
  asciiCanvas: HTMLCanvasElement | null;
  brightness: number;
  video: boolean;
  startVideoRecording: boolean;
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
  setAsciiCanvas: (asciiCanvas: HTMLCanvasElement) => void;
  setBrightness: (brightness: number) => void;
  setVideo: (video: boolean) => void;
  setStartVideoRecording: (startVideoRecording: boolean) => void;
}

type SettingStoreType = SettingState & SettingAction;

const SettingStore: StateCreator<SettingStoreType> = (set) => ({
  sidebar: false,
  color: Colors.Grey,
  theme: Theme.Normal,
  fontSize: 12,
  lineHeight: 12,
  letterSpacing: 2,
  contrast: 1.4,
  colorTheme: false,
  asciiCanvas: null,
  brightness: 0,
  video: false,
  startVideoRecording: false,

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
  setAsciiCanvas: (asciiCanvas: HTMLCanvasElement) =>
    set({ asciiCanvas: asciiCanvas }),

  setBrightness: (brightness: number) => set({ brightness: brightness }),
  setVideo: (video: boolean) => set({ video: video }),
  setStartVideoRecording: (startVideoRecording: boolean) =>
    set({ startVideoRecording: startVideoRecording }),
});

const useSettingStore = create<SettingStoreType>(SettingStore);
export default useSettingStore;
