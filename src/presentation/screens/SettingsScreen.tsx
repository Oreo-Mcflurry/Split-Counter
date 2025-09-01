import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  Switch,
  Animated,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSettings, useAppDispatch } from '../../store/hooks';
import { CounterAction } from '../../core/types';
import { useColorScheme } from '../../hooks/useColorScheme';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const settings = useSettings();
  const dispatch = useAppDispatch();
  const { colors } = useColorScheme();
  
  const [soundIntervalHeight] = useState(new Animated.Value(settings.defaultSound ? 1 : 0));
  const [hapticIntervalHeight] = useState(new Animated.Value(settings.defaultHaptic ? 1 : 0));
  const [soundInputVisible, setSoundInputVisible] = useState(false);
  const [hapticInputVisible, setHapticInputVisible] = useState(false);
  const [soundInputValue, setSoundInputValue] = useState(String(settings.soundInterval || 1));
  const [hapticInputValue, setHapticInputValue] = useState(String(settings.hapticInterval || 1));

  const handleSectionsCountChange = useCallback(
    (count: 1 | 2 | 3 | 4 | 5 | 6) => {
      const action: CounterAction = {
        type: 'SET_SECTIONS_COUNT',
        payload: { count },
      };
      dispatch(action);
    },
    [dispatch]
  );

  const handleSoundToggle = useCallback(
    (value: boolean) => {
      const action: CounterAction = {
        type: 'UPDATE_SETTINGS',
        payload: { defaultSound: value },
      };
      dispatch(action);
      
      Animated.timing(soundIntervalHeight, {
        toValue: value ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    },
    [dispatch, soundIntervalHeight]
  );

  const handleHapticToggle = useCallback(
    (value: boolean) => {
      const action: CounterAction = {
        type: 'UPDATE_SETTINGS',
        payload: { defaultHaptic: value },
      };
      dispatch(action);
      
      Animated.timing(hapticIntervalHeight, {
        toValue: value ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    },
    [dispatch, hapticIntervalHeight]
  );

  const validateAndClampInterval = (value: string): number => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 1) return 1;
    if (num > 100) return 100;
    return num;
  };

  const handleSoundIntervalChange = useCallback(
    (interval: number) => {
      const validInterval = Math.max(1, Math.min(100, interval));
      setSoundInputValue(String(validInterval));
      const action: CounterAction = {
        type: 'UPDATE_SETTINGS',
        payload: { soundInterval: validInterval },
      };
      dispatch(action);
    },
    [dispatch]
  );

  const handleHapticIntervalChange = useCallback(
    (interval: number) => {
      const validInterval = Math.max(1, Math.min(100, interval));
      setHapticInputValue(String(validInterval));
      const action: CounterAction = {
        type: 'UPDATE_SETTINGS',
        payload: { hapticInterval: validInterval },
      };
      dispatch(action);
    },
    [dispatch]
  );

  const handleSoundInputSubmit = useCallback(() => {
    const validValue = validateAndClampInterval(soundInputValue);
    handleSoundIntervalChange(validValue);
    setSoundInputVisible(false);
  }, [soundInputValue, handleSoundIntervalChange]);

  const handleHapticInputSubmit = useCallback(() => {
    const validValue = validateAndClampInterval(hapticInputValue);
    handleHapticIntervalChange(validValue);
    setHapticInputVisible(false);
  }, [hapticInputValue, handleHapticIntervalChange]);

  const handleResetAll = useCallback(() => {
    Alert.alert(
      '전체 초기화',
      '모든 카운터를 0으로 초기화하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '초기화',
          style: 'destructive',
          onPress: () => {
            const action: CounterAction = {
              type: 'RESET_ALL_SECTIONS',
            };
            dispatch(action);
          },
        },
      ]
    );
  }, [dispatch]);

  const renderSectionCountButton = (count: number) => (
    <TouchableOpacity
      key={count}
      style={[
        styles.sectionButton,
        settings.sectionsCount === count && dynamicStyles.activeButton,
      ]}
      onPress={() => handleSectionsCountChange(count as 1 | 2 | 3 | 4 | 5 | 6)}
    >
      <Text
        style={[
          styles.sectionButtonText,
          settings.sectionsCount === count && styles.activeButtonText,
        ]}
      >
        {count}
      </Text>
    </TouchableOpacity>
  );


  const dynamicStyles = {
    scrollView: {
      ...styles.scrollView,
      backgroundColor: colors.SURFACE,
    },
    section: {
      ...styles.section,
      backgroundColor: colors.CARD_BACKGROUND,
    },
    sectionTitle: {
      ...styles.sectionTitle,
      color: colors.TEXT,
    },
    settingLabel: {
      ...styles.settingLabel,
      color: colors.TEXT,
    },
    intervalLabel: {
      ...styles.intervalLabel,
      color: colors.TEXT_SECONDARY,
    },
    stepperValueText: {
      ...styles.stepperValueText,
      color: colors.TEXT,
    },
    footerText: {
      ...styles.footerText,
      color: colors.TEXT_SECONDARY,
    },
    footerSubtext: {
      ...styles.footerSubtext,
      color: colors.TEXT_SECONDARY,
    },
    activeButton: {
      ...styles.activeButton,
      backgroundColor: colors.ACCENT,
      borderColor: colors.ACCENT,
    },
    stepperButtonText: {
      ...styles.stepperButtonText,
      color: colors.ACCENT,
    },
    stepper: {
      ...styles.stepper,
      borderColor: colors.BORDER,
      backgroundColor: colors.CARD_BACKGROUND,
    },
    stepperButton: {
      ...styles.stepperButton,
      backgroundColor: colors.CARD_BACKGROUND,
    },
    stepperButtonLeft: {
      ...styles.stepperButtonLeft,
      borderRightColor: colors.BORDER,
    },
    stepperButtonRight: {
      ...styles.stepperButtonRight,
      borderLeftColor: colors.BORDER,
    },
    stepperValue: {
      ...styles.stepperValue,
      backgroundColor: colors.SURFACE,
    },
    stepperInput: {
      ...styles.stepperInput,
      backgroundColor: colors.SURFACE,
      color: colors.TEXT,
    },
    settingRow: {
      ...styles.settingRow,
      borderBottomColor: colors.BORDER,
    },
  };

  return (
    <ScrollView style={dynamicStyles.scrollView} showsVerticalScrollIndicator={false}>

        <View style={[dynamicStyles.section, styles.firstSection]}>
          <Text style={dynamicStyles.sectionTitle}>분할 개수</Text>
          <View style={styles.sectionButtonContainer}>
            {Array.from({ length: 6 }, (_, i) => i + 1).map(renderSectionCountButton)}
          </View>
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>기본 설정</Text>

          <View style={dynamicStyles.settingRow}>
            <Text style={dynamicStyles.settingLabel}>기본 사운드</Text>
            <Switch
              value={settings.defaultSound}
              onValueChange={handleSoundToggle}
              trackColor={{ false: '#E5E5EA', true: '#34C759' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <Animated.View
            style={[
              styles.intervalContainer,
              {
                maxHeight: soundIntervalHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 60],
                }),
                opacity: soundIntervalHeight,
              },
            ]}
          >
            <View style={styles.intervalRow}>
              <Text style={dynamicStyles.intervalLabel}>소리 알림 간격</Text>
              <View style={dynamicStyles.stepper}>
                <TouchableOpacity
                  style={[dynamicStyles.stepperButton, dynamicStyles.stepperButtonLeft]}
                  onPress={() => handleSoundIntervalChange(Math.max(1, (settings.soundInterval || 1) - 1))}
                  disabled={(settings.soundInterval || 1) <= 1}
                >
                  <Text style={[dynamicStyles.stepperButtonText, (settings.soundInterval || 1) <= 1 && styles.stepperButtonTextDisabled]}>−</Text>
                </TouchableOpacity>
                {soundInputVisible ? (
                  <TextInput
                    style={dynamicStyles.stepperInput}
                    value={soundInputValue}
                    onChangeText={(text) => {
                      const numericText = text.replace(/[^0-9]/g, '');
                      if (numericText.length <= 3) {
                        setSoundInputValue(numericText);
                      }
                    }}
                    onBlur={handleSoundInputSubmit}
                    onSubmitEditing={handleSoundInputSubmit}
                    keyboardType="numeric"
                    selectTextOnFocus
                    autoFocus
                    maxLength={3}
                  />
                ) : (
                  <TouchableOpacity
                    style={dynamicStyles.stepperValue}
                    onPress={() => setSoundInputVisible(true)}
                  >
                    <Text style={dynamicStyles.stepperValueText}>{settings.soundInterval || 1}</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[dynamicStyles.stepperButton, dynamicStyles.stepperButtonRight]}
                  onPress={() => handleSoundIntervalChange(Math.min(100, (settings.soundInterval || 1) + 1))}
                  disabled={(settings.soundInterval || 1) >= 100}
                >
                  <Text style={[dynamicStyles.stepperButtonText, (settings.soundInterval || 1) >= 100 && styles.stepperButtonTextDisabled]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>

          <View style={[dynamicStyles.settingRow, { marginTop: 12 }]}>
            <Text style={dynamicStyles.settingLabel}>기본 햅틱</Text>
            <Switch
              value={settings.defaultHaptic}
              onValueChange={handleHapticToggle}
              trackColor={{ false: '#E5E5EA', true: '#34C759' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <Animated.View
            style={[
              styles.intervalContainer,
              {
                maxHeight: hapticIntervalHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 60],
                }),
                opacity: hapticIntervalHeight,
              },
            ]}
          >
            <View style={styles.intervalRow}>
              <Text style={dynamicStyles.intervalLabel}>햅틱 알림 간격</Text>
              <View style={dynamicStyles.stepper}>
                <TouchableOpacity
                  style={[dynamicStyles.stepperButton, dynamicStyles.stepperButtonLeft]}
                  onPress={() => handleHapticIntervalChange(Math.max(1, (settings.hapticInterval || 1) - 1))}
                  disabled={(settings.hapticInterval || 1) <= 1}
                >
                  <Text style={[dynamicStyles.stepperButtonText, (settings.hapticInterval || 1) <= 1 && styles.stepperButtonTextDisabled]}>−</Text>
                </TouchableOpacity>
                {hapticInputVisible ? (
                  <TextInput
                    style={dynamicStyles.stepperInput}
                    value={hapticInputValue}
                    onChangeText={(text) => {
                      const numericText = text.replace(/[^0-9]/g, '');
                      if (numericText.length <= 3) {
                        setHapticInputValue(numericText);
                      }
                    }}
                    onBlur={handleHapticInputSubmit}
                    onSubmitEditing={handleHapticInputSubmit}
                    keyboardType="numeric"
                    selectTextOnFocus
                    autoFocus
                    maxLength={3}
                  />
                ) : (
                  <TouchableOpacity
                    style={dynamicStyles.stepperValue}
                    onPress={() => setHapticInputVisible(true)}
                  >
                    <Text style={dynamicStyles.stepperValueText}>{settings.hapticInterval || 1}</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[dynamicStyles.stepperButton, dynamicStyles.stepperButtonRight]}
                  onPress={() => handleHapticIntervalChange(Math.min(100, (settings.hapticInterval || 1) + 1))}
                  disabled={(settings.hapticInterval || 1) >= 100}
                >
                  <Text style={[dynamicStyles.stepperButtonText, (settings.hapticInterval || 1) >= 100 && styles.stepperButtonTextDisabled]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>초기화</Text>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetAll}
          >
            <Text style={styles.resetButtonText}>모든 카운터 초기화</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={dynamicStyles.footerText}>SplitCounter v1.0.0</Text>
          <Text style={dynamicStyles.footerSubtext}>
            탭: +1, 길게 누르기: 초기화
          </Text>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  firstSection: {
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  sectionButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionButton: {
    width: '15%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeButton: {
    backgroundColor: '#FF6F00',
    borderColor: '#FF6F00',
  },
  sectionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  activeButtonText: {
    color: 'white',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  intervalContainer: {
    overflow: 'hidden',
    paddingBottom: 12,
  },
  intervalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  intervalLabel: {
    fontSize: 15,
    color: '#666',
  },
  stepper: {
    flexDirection: 'row',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  stepperButton: {
    width: 40,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  stepperButtonLeft: {
    borderRightWidth: 1,
    borderRightColor: '#D1D1D6',
  },
  stepperButtonRight: {
    borderLeftWidth: 1,
    borderLeftColor: '#D1D1D6',
  },
  stepperButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF6F00',
  },
  stepperButtonTextDisabled: {
    color: '#C7C7CC',
  },
  stepperValue: {
    minWidth: 40,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  stepperValueText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  stepperInput: {
    minWidth: 40,
    height: 28,
    backgroundColor: '#F8F8F8',
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default SettingsScreen;
