import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { Section } from '../../core/types';
import { useAppDispatch, useSettings } from '../../store/hooks';
import {
  createIncrementAction,
  createDecrementAction,
  createResetAction,
} from '../../store/hooks';
import { playTapSound } from '../../utils/sound';
import { triggerHaptic } from '../../utils/haptic';

type Props = {
  section: Section;
  onLongPress?: (section: Section) => void;
};


const SectionItem: React.FC<Props> = memo(({ section, onLongPress }) => {
  const dispatch = useAppDispatch();
  const settings = useSettings();

  const handleTap = useCallback(() => {
    const nextCount = section.count + 1;
    dispatch(createIncrementAction(section.id));

    // 사운드 및 햅틱 처리
    const shouldPlaySound = settings.soundInterval === 1 || nextCount % settings.soundInterval === 0;
    if (settings.defaultSound && shouldPlaySound) {
      playTapSound();
    }
    if (settings.defaultHaptic && (nextCount % settings.hapticInterval === 0)) {
      triggerHaptic('light');
    }
  }, [dispatch, section.id, section.count, settings.defaultSound, settings.defaultHaptic, settings.soundInterval, settings.hapticInterval]);

  const handleLongPress = useCallback(() => {
    Alert.alert(
      '초기화 확인',
      `해당 카운터를 초기화하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '초기화',
          style: 'destructive',
          onPress: () => dispatch(createResetAction(section.id)),
        },
      ]
    );
  }, [dispatch, section.id, section.title]);

  const handlePress = useCallback(() => {
    handleTap();
  }, [handleTap]);

  const handleSectionLongPress = useCallback(() => {
    onLongPress?.(section);
  }, [onLongPress, section]);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: section.color }]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.6}
      accessibilityLabel={`${section.title} 카운트 ${section.count}`}
      accessibilityRole="button"
      accessibilityHint="탭하여 증가, 길게 눌러 초기화"
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {section.title}
        </Text>
        <Text style={styles.count}>{section.count}</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSectionLongPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="ellipsis-horizontal" size={16} color="white" style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

SectionItem.displayName = 'SectionItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  count: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  settingsButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 16,
    opacity: 0.8,
  },
});

export default SectionItem;
