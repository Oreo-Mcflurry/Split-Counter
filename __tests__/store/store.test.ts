import { createInitialState } from '../../src/core/utils';
import { CounterUseCases } from '../../src/domain/usecases/CounterUseCases';
import { AppRepository } from '../../src/data/repositories/AppRepository';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe('CounterUseCases', () => {
  let appRepository: AppRepository;
  let counterUseCases: CounterUseCases;
  let initialState: any;

  beforeEach(() => {
    appRepository = new AppRepository();
    counterUseCases = new CounterUseCases(appRepository);
    initialState = createInitialState();
  });

  describe('incrementSection', () => {
    it('should increment section count', () => {
      const sectionId = 'S1';
      const result = counterUseCases.incrementSection(initialState, sectionId);

      const updatedSection = result.sections.find(s => s.id === sectionId);
      expect(updatedSection?.count).toBe(1);
    });

    it('should not modify other sections', () => {
      const sectionId = 'S1';
      const result = counterUseCases.incrementSection(initialState, sectionId);

      const otherSections = result.sections.filter(s => s.id !== sectionId);
      otherSections.forEach(section => {
        expect(section.count).toBe(0);
      });
    });
  });

  describe('decrementSection', () => {
    it('should decrement section count', () => {
      const sectionId = 'S1';
      const stateWithCount = counterUseCases.incrementSection(initialState, sectionId);
      const result = counterUseCases.decrementSection(stateWithCount, sectionId);

      const updatedSection = result.sections.find(s => s.id === sectionId);
      expect(updatedSection?.count).toBe(0);
    });

    it('should not go below zero', () => {
      const sectionId = 'S1';
      const result = counterUseCases.decrementSection(initialState, sectionId);

      const updatedSection = result.sections.find(s => s.id === sectionId);
      expect(updatedSection?.count).toBe(0);
    });
  });

  describe('resetSection', () => {
    it('should reset section count to zero', () => {
      const sectionId = 'S1';
      let state = initialState;

      // 여러 번 증가
      for (let i = 0; i < 5; i++) {
        state = counterUseCases.incrementSection(state, sectionId);
      }

      const result = counterUseCases.resetSection(state, sectionId);
      const resetSection = result.sections.find(s => s.id === sectionId);

      expect(resetSection?.count).toBe(0);
    });
  });

  describe('updateSectionsCount', () => {
    it('should update sections count and preserve existing data', () => {
      const newCount = 6;
      const result = counterUseCases.updateSectionsCount(initialState, newCount);

      expect(result.settings.sectionsCount).toBe(newCount);
      expect(result.sections.length).toBe(newCount);
    });

    it('should preserve existing section counts when reducing', () => {
      let state = initialState;

      // 첫 번째 섹션에 카운트 추가
      state = counterUseCases.incrementSection(state, 'S1');
      state = counterUseCases.incrementSection(state, 'S1');

      // 섹션 수를 2로 감소
      const result = counterUseCases.updateSectionsCount(state, 2);

      expect(result.sections.length).toBe(2);
      expect(result.sections[0].count).toBe(2); // 기존 카운트 유지
    });
  });
});
