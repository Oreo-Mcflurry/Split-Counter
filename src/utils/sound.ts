import { Player } from '@react-native-community/audio-toolkit';
import { Platform } from 'react-native';

let ringSound: Player | null = null;

export const initializeSound = () => {
  try {
    // Load the ring.mp3 file
    ringSound = new Player('ring.mp3', {
      autoDestroy: false,
      continuesToPlayInBackground: false,
    });
    
    ringSound.prepare((err) => {
      if (err) {
        console.log('Failed to load ring sound:', err);
      } else {
        console.log('Ring sound loaded successfully');
      }
    });
  } catch (error) {
    console.log('Sound initialization error:', error);
  }
};

export const playTapSound = () => {
  try {
    if (ringSound && ringSound.canPlay) {
      // 재생 위치를 처음으로 되돌리고 재생
      ringSound.seek(0);
      ringSound.play((err) => {
        if (err) {
          console.log('Ring sound playback failed:', err);
        }
      });
    }
  } catch (error) {
    console.log('Sound playback failed:', error);
  }
};

export const releaseSound = () => {
  if (ringSound) {
    ringSound.destroy();
    ringSound = null;
  }
};