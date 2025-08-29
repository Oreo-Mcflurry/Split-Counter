import { AppState } from '../../core/types';
import { StorageDataSource } from '../datasources/storage';
import { createInitialState } from '../../core/utils';

export class AppRepository {
  async saveAppState(state: AppState): Promise<void> {
    await StorageDataSource.saveState(state);
  }

  async loadAppState(): Promise<AppState> {
    const saved = await StorageDataSource.loadState();
    return saved || createInitialState();
  }

  async clearAppState(): Promise<void> {
    await StorageDataSource.clearState();
  }
}
