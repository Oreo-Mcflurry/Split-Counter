import React, { useState, useCallback, useLayoutEffect } from 'react';
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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Section, CounterAction } from '../../core/types';
import { useAppDispatch } from '../../store/hooks';
import { COLORS } from '../../core/constants';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useColorScheme } from '../../hooks/useColorScheme';

type SectionEditRouteProp = RouteProp<RootStackParamList, 'SectionEdit'>;

const SectionEditScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<SectionEditRouteProp>();
  const { section } = route.params;
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(section.title);
  const [selectedColor, setSelectedColor] = useState(section.color);
  const { colors } = useColorScheme();

  const handleSave = useCallback(() => {
    if (!title.trim()) {
      Alert.alert('오류', '제목을 입력해주세요.');
      return;
    }

    const updatedSection: Section = {
      ...section,
      title: title.trim(),
      color: selectedColor,
    };

    const action: CounterAction = {
      type: 'UPDATE_SECTION',
      payload: updatedSection,
    };

    dispatch(action);
    navigation.goBack();
  }, [dispatch, section, title, selectedColor, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#007AFF', fontSize: 17 }}>취소</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          <Text style={{ color: colors.ACCENT, fontSize: 17, fontWeight: '600' }}>저장</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSave]);


  const renderColorOption = (color: string, _index: number) => (
    <TouchableOpacity
      key={color}
      style={[
        styles.colorOption,
        { backgroundColor: color },
        selectedColor === color && dynamicStyles.selectedColorOption,
      ]}
      onPress={() => setSelectedColor(color)}
    />
  );

  const dynamicStyles = {
    container: {
      ...styles.container,
      backgroundColor: colors.SURFACE,
    },
    scrollView: {
      ...styles.scrollView,
      backgroundColor: colors.SURFACE,
    },
    preview: {
      ...styles.preview,
      backgroundColor: colors.CARD_BACKGROUND,
    },
    section: {
      ...styles.section,
      backgroundColor: colors.CARD_BACKGROUND,
    },
    sectionTitle: {
      ...styles.sectionTitle,
      color: colors.TEXT,
    },
    titleInput: {
      ...styles.titleInput,
      backgroundColor: colors.SURFACE,
      borderColor: colors.BORDER,
      color: colors.TEXT,
    },
    selectedColorOption: {
      ...styles.selectedColorOption,
      borderColor: colors.TEXT,
    },
  };

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView style={dynamicStyles.scrollView} showsVerticalScrollIndicator={false}>

        <View style={dynamicStyles.preview}>
          <View style={[styles.previewItem, { backgroundColor: selectedColor }]}>
            <Text style={styles.previewTitle} numberOfLines={1}>
              {title || '제목 없음'}
            </Text>
            <Text style={styles.previewCount}>{section.count}</Text>
          </View>
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>제목</Text>
          <TextInput
            style={dynamicStyles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="섹션 제목을 입력하세요"
            placeholderTextColor={colors.TEXT_SECONDARY}
            maxLength={20}
            returnKeyType="done"
            blurOnSubmit
          />
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>색상</Text>
          <View style={styles.colorContainer}>
            {COLORS.map(renderColorOption)}
          </View>
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
    justifyContent: 'space-around',
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    margin: 3,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    borderColor: '#333',
  },
});

export default SectionEditScreen;
