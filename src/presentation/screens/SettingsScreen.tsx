import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useSettings, useAppDispatch } from '../../store/hooks';
import { CounterAction } from '../../core/types';

type Props = {
  onClose: () => void;
};

const SettingsScreen: React.FC<Props> = ({ onClose }) => {
  const settings = useSettings();
  const dispatch = useAppDispatch();

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

  const handleSettingsChange = useCallback(
    (key: 'defaultSound' | 'defaultHaptic', value: boolean) => {
      const action: CounterAction = {
        type: 'UPDATE_SETTINGS',
        payload: { [key]: value },
      };
      dispatch(action);
    },
    [dispatch]
  );

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
            // TODO: 전체 초기화 액션 구현
          },
        },
      ]
    );
  }, []);

  const renderSectionCountButton = (count: number) => (
    <TouchableOpacity
      key={count}
      style={[
        styles.sectionButton,
        settings.sectionsCount === count && styles.activeButton,
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>설정</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>완료</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>분할 개수</Text>
          <View style={styles.sectionButtonContainer}>
            {Array.from({ length: 6 }, (_, i) => i + 1).map(renderSectionCountButton)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>기본 설정</Text>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => handleSettingsChange('defaultSound', !settings.defaultSound)}
          >
            <Text style={styles.settingLabel}>기본 사운드</Text>
            <View style={[
              styles.toggle,
              settings.defaultSound && styles.toggleActive,
            ]}>
              <Text style={styles.toggleText}>
                {settings.defaultSound ? 'ON' : 'OFF'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => handleSettingsChange('defaultHaptic', !settings.defaultHaptic)}
          >
            <Text style={styles.settingLabel}>기본 햅틱</Text>
            <View style={[
              styles.toggle,
              settings.defaultHaptic && styles.toggleActive,
            ]}>
              <Text style={styles.toggleText}>
                {settings.defaultHaptic ? 'ON' : 'OFF'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>초기화</Text>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetAll}
          >
            <Text style={styles.resetButtonText}>모든 카운터 초기화</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>SplitCounter v1.0.0</Text>
          <Text style={styles.footerSubtext}>
            탭: +1, 길게 누르기: -1, 더블탭: 초기화
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    backgroundColor: '#007AFF',
    borderColor: '#0056CC',
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
  toggle: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 50,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#007AFF',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
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
