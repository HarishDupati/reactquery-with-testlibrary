import { createContext } from "react";

export type themeValueType ='light' | 'dark';

export interface IThemeContext {
  themeValue: 'light' | 'dark';
  setter: (v: themeValueType) => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);
