import React, { useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useSections, useSettings, useStoreActions } from '../../store/hooks';
import { getGridColumns } from '../../core/utils';
import { Section } from '../../core/types';
import SectionItem from '../components/SectionItem';

type Props = {
  onSectionLongPress: (section: Section) => void;
  onSettingsPress: () => void;
};

const HomeScreen: React.FC<Props> = ({ onSectionLongPress, onSettingsPress }) => {
  const sections = useSections();
  const settings = useSettings();
  const { loadState } = useStoreActions();

  const { width } = Dimensions.get('window');
  const numColumns = getGridColumns(settings.sectionsCount);
  const itemSize = (width - 32 - (numColumns - 1) * 8) / numColumns;

  useEffect(() => {
    loadState();
  }, [loadState]);

  const renderSection = useCallback(
    ({ item }: { item: Section }) => (
      <View style={{ width: itemSize }}>
        <SectionItem
          section={item}
          onLongPress={onSectionLongPress}
        />
      </View>
    ),
    [itemSize, onSectionLongPress]
  );

  const keyExtractor = useCallback((item: Section) => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Split Counter</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={onSettingsPress}
          accessibilityLabel="설정"
          accessibilityRole="button"
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={keyExtractor}
          numColumns={numColumns}
          key={`${numColumns}-${settings.sectionsCount}`}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={numColumns > 1 ? styles.row : null}
          showsVerticalScrollIndicator={false}
          scrollEnabled={sections.length > 4}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  settingsIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-around',
  },
});

export default HomeScreen;
