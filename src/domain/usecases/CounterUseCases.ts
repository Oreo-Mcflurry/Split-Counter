import { AppRepository } from '../../data/repositories/AppRepository';
import { AppState, Section, Settings } from '../../core/types';
import { generateDefaultSections } from '../../core/utils';

export class CounterUseCases {
  constructor(private appRepository: AppRepository) {}

  async loadAppState(): Promise<AppState> {
    return await this.appRepository.loadAppState();
  }

  async saveAppState(state: AppState): Promise<void> {
    await this.appRepository.saveAppState(state);
  }

  incrementSection(state: AppState, sectionId: string): AppState {
    const sections = state.sections.map(section =>
      section.id === sectionId
        ? { ...section, count: section.count + 1 }
        : section
    );
    return { ...state, sections };
  }

  decrementSection(state: AppState, sectionId: string): AppState {
    const sections = state.sections.map(section =>
      section.id === sectionId
        ? { ...section, count: Math.max(0, section.count - 1) }
        : section
    );
    return { ...state, sections };
  }

  resetSection(state: AppState, sectionId: string): AppState {
    const sections = state.sections.map(section =>
      section.id === sectionId
        ? { ...section, count: 0 }
        : section
    );
    return { ...state, sections };
  }

  updateSection(state: AppState, updatedSection: Section): AppState {
    const sections = state.sections.map(section =>
      section.id === updatedSection.id ? updatedSection : section
    );
    return { ...state, sections };
  }

  updateSectionsCount(state: AppState, count: 1 | 2 | 3 | 4 | 5 | 6): AppState {
    const newSettings = { ...state.settings, sectionsCount: count };
    const newSections = generateDefaultSections(count);

    // 기존 섹션 데이터를 가능한 한 보존
    const preservedSections = newSections.map((newSection, index) => {
      const existingSection = state.sections[index];
      return existingSection
        ? { ...newSection, count: existingSection.count, title: existingSection.title }
        : newSection;
    });

    return {
      ...state,
      settings: newSettings,
      sections: preservedSections,
    };
  }

  updateSettings(state: AppState, settings: Partial<Settings>): AppState {
    return {
      ...state,
      settings: { ...state.settings, ...settings },
    };
  }
}
