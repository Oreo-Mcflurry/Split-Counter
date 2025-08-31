let tapSound: any = null;

export const initializeSound = () => {
  try {
    console.log('Sound system initialized');
  } catch (error) {
    console.log('Sound initialization error:', error);
  }
};

export const playTapSound = () => {
  try {
    // React Native의 기본 시스템 사운드 사용
    const { Platform } = require('react-native');
    
    if (Platform.OS === 'ios') {
      // iOS에서는 시스템 사운드를 재생하기 위해 네이티브 모듈 사용
      // 실제 사운드는 나중에 추가할 수 있음
      console.log('Playing iOS tap sound');
    } else {
      // Android에서는 시스템 클릭 사운드
      console.log('Playing Android tap sound');
    }
  } catch (error) {
    console.log('Sound playback failed:', error);
  }
};

export const releaseSound = () => {
  if (tapSound) {
    tapSound.release();
    tapSound = null;
  }
};