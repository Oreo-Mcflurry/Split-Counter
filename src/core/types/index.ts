export type Section = {
  id: string;
  title: string;
  color: string;
  count: number;
  sound: boolean;
  haptic: boolean;
};

export type Settings = {
  sectionsCount: 1 | 2 | 3 | 4 | 5 | 6;
  defaultSound: boolean;
  defaultHaptic: boolean;
};

export type AppState = {
  sections: Section[];
  settings: Settings;
};

export type CounterAction =
  | { type: 'INCREMENT_SECTION'; payload: { sectionId: string } }
  | { type: 'DECREMENT_SECTION'; payload: { sectionId: string } }
  | { type: 'RESET_SECTION'; payload: { sectionId: string } }
  | { type: 'UPDATE_SECTION'; payload: Section }
  | { type: 'SET_SECTIONS_COUNT'; payload: { count: 1 | 2 | 3 | 4 | 5 | 6 } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'LOAD_STATE'; payload: AppState };

export const DEFAULT_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#FFA07A',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E9',
] as const;

export type Color = typeof DEFAULT_COLORS[number];
