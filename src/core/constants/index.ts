import { DEFAULT_COLORS } from '../types';

export const APP_CONFIG = {
  MIN_SECTIONS: 1,
  MAX_SECTIONS: 6,
  DEFAULT_SECTION_COUNT: 4,
  DEFAULT_SOUND: true,
  DEFAULT_HAPTIC: true,
  DEFAULT_SOUND_INTERVAL: 1,
  DEFAULT_HAPTIC_INTERVAL: 1,
} as const;

export const STORAGE_KEYS = {
  APP_STATE: 'splitcounter_app_state',
} as const;

export const COLORS = DEFAULT_COLORS;

export const THEME_COLORS = {
  LIGHT: {
    PRIMARY: '#FF6F00',
    ACCENT: '#FF6F00',
    BACKGROUND: '#FFFFFF',
    CARD_BACKGROUND: '#FFFFFF',
    SURFACE: '#F5F5F5',
    TEXT: '#000000',
    TEXT_SECONDARY: '#666666',
    BORDER: '#E0E0E0',
    ICON: '#000000',
    HEADER_BACKGROUND: '#FFFFFF',
  },
  DARK: {
    PRIMARY: '#FF6F00',
    ACCENT: '#FF6F00',
    BACKGROUND: '#000000',
    CARD_BACKGROUND: '#1C1C1E',
    SURFACE: '#2C2C2E',
    TEXT: '#FFFFFF',
    TEXT_SECONDARY: '#8E8E93',
    BORDER: '#38383A',
    ICON: '#FFFFFF',
    HEADER_BACKGROUND: '#1C1C1E',
  }
} as const;

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
