import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from '../../core/types';
import { STORAGE_KEYS } from '../../core/constants';

export const StorageDataSource = {
  saveState: async (state: AppState): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.APP_STATE, JSON.stringify(state));
    } catch (error) {
      console.error('저장 실패:', error);
    }
  },

  loadState: async (): Promise<AppState | null> => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.APP_STATE);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('로드 실패:', error);
      return null;
    }
  },

  clearState: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.APP_STATE);
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  },
};
