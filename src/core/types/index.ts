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
  soundInterval: number;
  hapticInterval: number;
};

export type AppState = {
  sections: Section[];
  settings: Settings;
};

export type CounterAction =
  | { type: 'INCREMENT_SECTION'; payload: { sectionId: string } }
  | { type: 'DECREMENT_SECTION'; payload: { sectionId: string } }
  | { type: 'RESET_SECTION'; payload: { sectionId: string } }
  | { type: 'RESET_ALL_SECTIONS' }
  | { type: 'UPDATE_SECTION'; payload: Section }
  | { type: 'SET_SECTIONS_COUNT'; payload: { count: 1 | 2 | 3 | 4 | 5 | 6 } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'LOAD_STATE'; payload: AppState };

export const DEFAULT_COLORS = [
  '#FF6B6B', // 빨강
  '#4ECDC4', // 청록
  '#45B7D1', // 파랑
  '#FFA07A', // 연어
  '#98D8C8', // 민트
  '#F7DC6F', // 노랑
  '#BB8FCE', // 보라
  '#85C1E9', // 하늘
  '#FF8A80', // 연핑크
  '#69F0AE', // 연초록
  '#40C4FF', // 라이트블루
  '#FFB74D', // 오렌지
  '#F48FB1', // 핑크
  '#CE93D8', // 라벤더
  '#80CBC4', // 틸
  '#A5D6A7', // 라이트그린
] as const;

export type Color = typeof DEFAULT_COLORS[number];
