import { DEFAULT_COLORS } from '../types';

export const APP_CONFIG = {
  MIN_SECTIONS: 1,
  MAX_SECTIONS: 6,
  DEFAULT_SECTION_COUNT: 4,
  DEFAULT_SOUND: true,
  DEFAULT_HAPTIC: true,
} as const;

export const STORAGE_KEYS = {
  APP_STATE: 'splitcounter_app_state',
} as const;

export const COLORS = DEFAULT_COLORS;

export const LAYOUT_CONFIG = {
  getColumnsForSections: (count: number): number => {
    if (count === 1) {return 1;}
    if (count <= 4) {return 2;}
    return 3;
  },
} as const;

export const SOUND_FILES = {
  TAP: 'tap.mp3',
  RESET: 'reset.mp3',
} as const;
