import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { AppState, CounterAction } from '../core/types';
import { createInitialState } from '../core/utils';
import { AppRepository } from '../data/repositories/AppRepository';
import { CounterUseCases } from '../domain/usecases/CounterUseCases';

type StoreState = {
  appState: AppState;
  dispatch: (action: CounterAction) => void;
  loadState: () => Promise<void>;
  saveState: () => Promise<void>;
};

const appRepository = new AppRepository();
const counterUseCases = new CounterUseCases(appRepository);

const counterReducer = (state: AppState, action: CounterAction): AppState => {
  switch (action.type) {
    case 'INCREMENT_SECTION':
      return counterUseCases.incrementSection(state, action.payload.sectionId);

    case 'DECREMENT_SECTION':
      return counterUseCases.decrementSection(state, action.payload.sectionId);

    case 'RESET_SECTION':
      return counterUseCases.resetSection(state, action.payload.sectionId);

    case 'UPDATE_SECTION':
      return counterUseCases.updateSection(state, action.payload);

    case 'SET_SECTIONS_COUNT':
      return counterUseCases.updateSectionsCount(state, action.payload.count);

    case 'UPDATE_SETTINGS':
      return counterUseCases.updateSettings(state, action.payload);

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
};

export const useCounterStore = create<StoreState>()(subscribeWithSelector((set, get) => ({
  appState: createInitialState(),

  dispatch: (action: CounterAction) => {
    const currentState = get().appState;
    const newState = counterReducer(currentState, action);
    set({ appState: newState });
    // 자동 저장
    setTimeout(() => get().saveState(), 100);
  },

  loadState: async () => {
    try {
      const state = await counterUseCases.loadAppState();
      set({ appState: state });
    } catch (error) {
      console.error('상태 로드 실패:', error);
    }
  },

  saveState: async () => {
    try {
      const state = get().appState;
      await counterUseCases.saveAppState(state);
    } catch (error) {
      console.error('상태 저장 실패:', error);
    }
  },
})));
