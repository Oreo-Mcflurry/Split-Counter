import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Section, CounterAction } from '../../core/types';
import { useAppDispatch } from '../../store/hooks';
import { COLORS } from '../../core/constants';

type Props = {
  section: Section;
  onClose: () => void;
};

const SectionEditScreen: React.FC<Props> = ({ section, onClose }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(section.title);
  const [selectedColor, setSelectedColor] = useState(section.color);
  const [sound, setSound] = useState(section.sound);
  const [haptic, setHaptic] = useState(section.haptic);

  const handleSave = useCallback(() => {
    if (!title.trim()) {
      Alert.alert('오류', '제목을 입력해주세요.');
      return;
    }

    const updatedSection: Section = {
      ...section,
      title: title.trim(),
      color: selectedColor,
      sound,
      haptic,
    };

    const action: CounterAction = {
      type: 'UPDATE_SECTION',
      payload: updatedSection,
    };

    dispatch(action);
    onClose();
  }, [dispatch, section, title, selectedColor, sound, haptic, onClose]);

  const handleReset = useCallback(() => {
    Alert.alert(
      '카운터 초기화',
      `${section.title}의 카운터를 0으로 초기화하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '초기화',
          style: 'destructive',
          onPress: () => {
            const action: CounterAction = {
              type: 'RESET_SECTION',
              payload: { sectionId: section.id },
            };
            dispatch(action);
          },
        },
      ]
    );
  }, [dispatch, section]);

  const renderColorOption = (color: string, _index: number) => (
    <TouchableOpacity
      key={color}
      style={[
        styles.colorOption,
        { backgroundColor: color },
        selectedColor === color && styles.selectedColorOption,
      ]}
      onPress={() => setSelectedColor(color)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>취소</Text>
          </TouchableOpacity>
          <Text style={styles.title}>섹션 편집</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>저장</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.preview}>
          <View style={[styles.previewItem, { backgroundColor: selectedColor }]}>
            <Text style={styles.previewTitle} numberOfLines={1}>
              {title || '제목 없음'}
            </Text>
            <Text style={styles.previewCount}>{section.count}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제목</Text>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="섹션 제목을 입력하세요"
            maxLength={20}
            returnKeyType="done"
            blurOnSubmit
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>색상</Text>
          <View style={styles.colorContainer}>
            {COLORS.map(renderColorOption)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>옵션</Text>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setSound(!sound)}
          >
            <Text style={styles.optionLabel}>사운드</Text>
            <View style={[
              styles.toggle,
              sound && styles.toggleActive,
            ]}>
              <Text style={[styles.toggleText, sound && styles.toggleTextActive]}>
                {sound ? 'ON' : 'OFF'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setHaptic(!haptic)}
          >
            <Text style={styles.optionLabel}>햅틱</Text>
            <View style={[
              styles.toggle,
              haptic && styles.toggleActive,
            ]}>
              <Text style={[styles.toggleText, haptic && styles.toggleTextActive]}>
                {haptic ? 'ON' : 'OFF'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>카운터 관리</Text>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
          >
            <Text style={styles.resetButtonText}>카운터 초기화</Text>
          </TouchableOpacity>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  saveButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  preview: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  previewItem: {
    width: 120,
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  previewCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 4,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    borderColor: '#333',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionLabel: {
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
  toggleTextActive: {
    color: 'white',
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SectionEditScreen;
