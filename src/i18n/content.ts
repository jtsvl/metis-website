import type { Content } from './types';
import de from '../data/de.json';
import en from '../data/en.json';

export const languages = {
  de: "Deutsch",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "de";

export const content: Record<Lang, Content> = {
  de: de as Content,
  en: en as Content,
};
