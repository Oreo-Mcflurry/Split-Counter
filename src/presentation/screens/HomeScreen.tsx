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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSections, useSettings, useStoreActions } from '../../store/hooks';
import { getGridColumns } from '../../core/utils';
import { Section } from '../../core/types';
import SectionItem from '../components/SectionItem';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useColorScheme } from '../../hooks/useColorScheme';

type Props = {
  onSectionLongPress: (section: Section) => void;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ onSectionLongPress }) => {
  const navigation = useNavigation<NavigationProp>();
  const sections = useSections();
  const settings = useSettings();
  const { loadState } = useStoreActions();
  const { colors } = useColorScheme();

  const { width } = Dimensions.get('window');
  const numColumns = getGridColumns(settings.sectionsCount);
  const itemSize = (width - 32 - (numColumns * 8)) / numColumns;

  useEffect(() => {
    loadState();
  }, [loadState]);

  const renderSection = useCallback(
    ({ item }: { item: Section }) => (
      <View style={{ width: itemSize, margin: 4 }}>
        <SectionItem
          section={item}
          onLongPress={onSectionLongPress}
        />
      </View>
    ),
    [itemSize, onSectionLongPress]
  );

  const keyExtractor = useCallback((item: Section) => item.id, []);

  const dynamicStyles = {
    container: {
      ...styles.container,
      backgroundColor: colors.SURFACE,
    },
  };

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar 
        barStyle={colors.ICON === '#FFFFFF' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.SURFACE} 
      />
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
          scrollEnabled={false}
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
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'flex-start',
    paddingHorizontal: 4,
  },
});

export default HomeScreen;
