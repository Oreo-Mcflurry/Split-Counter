import { useCounterStore } from './store';
import { CounterAction } from '../core/types';

export const useAppState = () => {
  return useCounterStore(state => state.appState);
};

export const useAppDispatch = () => {
  return useCounterStore(state => state.dispatch);
};

export const useSections = () => {
  return useCounterStore(state => state.appState.sections);
};

export const useSettings = () => {
  return useCounterStore(state => state.appState.settings);
};

export const useStoreActions = () => {
  const loadState = useCounterStore(state => state.loadState);
  const saveState = useCounterStore(state => state.saveState);
  const dispatch = useCounterStore(state => state.dispatch);

  return { loadState, saveState, dispatch };
};

// Action Creators
export const createIncrementAction = (sectionId: string): CounterAction => ({
  type: 'INCREMENT_SECTION',
  payload: { sectionId },
});

export const createDecrementAction = (sectionId: string): CounterAction => ({
  type: 'DECREMENT_SECTION',
  payload: { sectionId },
});

export const createResetAction = (sectionId: string): CounterAction => ({
  type: 'RESET_SECTION',
  payload: { sectionId },
});

