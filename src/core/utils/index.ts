import { Section, AppState } from '../types';
import { APP_CONFIG, COLORS } from '../constants';

export const generateDefaultSections = (count: number): Section[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `S${index + 1}`,
    title: `섹션 ${index + 1}`,
    color: COLORS[index % COLORS.length],
    count: 0,
    sound: APP_CONFIG.DEFAULT_SOUND,
    haptic: APP_CONFIG.DEFAULT_HAPTIC,
  }));
};

export const createInitialState = (): AppState => ({
  sections: generateDefaultSections(APP_CONFIG.DEFAULT_SECTION_COUNT),
  settings: {
    sectionsCount: APP_CONFIG.DEFAULT_SECTION_COUNT,
    defaultSound: APP_CONFIG.DEFAULT_SOUND,
    defaultHaptic: APP_CONFIG.DEFAULT_HAPTIC,
  },
});

export const getGridColumns = (sectionsCount: number): number => {
  return Math.ceil(Math.sqrt(sectionsCount));
};

export const validateSectionId = (sectionId: string, sections: Section[]): boolean => {
  return sections.some(section => section.id === sectionId);
};
