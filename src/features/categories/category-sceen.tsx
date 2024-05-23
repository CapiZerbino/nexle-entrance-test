import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCategories} from './use-category';
import {AppColors} from '../../common/utils';

const CategoryScreen = React.memo(() => {
  const {
    categories,
    loading,
    error,
    selectedCategories,
    toggleCategory,
    isCategorySelected,
    handleDone,
    handleBack,
  } = useCategories();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleBack}>
        <Icon name="arrow-left" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDone}
        disabled={selectedCategories.length === 0}>
        <Text style={styles.buttonDone}>Done</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTitle = () => (
    <>
      <Text style={styles.title}>Wellcome to Nexle Entrance Test</Text>
      <Text style={styles.subtitle}>
        Please select categories what you would like to see on your feed. You
        can set this later on Filter.
      </Text>
    </>
  );

  const renderListCategory = () => (
    <ScrollView
      contentContainerStyle={styles.categoriesContainer}
      showsVerticalScrollIndicator={false}>
      {loading && <ActivityIndicator />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.categoryButton]}
          onPress={() => toggleCategory(category.id)}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={
              isCategorySelected(category.id)
                ? AppColors.getInstance().getGradientColors()
                : AppColors.getInstance().getGradientTransparentColors()
            }
            style={styles.linearButton}>
            <Text
              style={[
                styles.categoryText,
                isCategorySelected(category.id) && styles.selectedCategoryText,
              ]}>
              {category.name}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <ImageBackground
      source={require('./../../common/assets/images/category_background.png')}
      style={styles.background}
      resizeMode="cover">
      <LinearGradient
        colors={AppColors.getInstance().getGradientBlackColors()}
        style={styles.overlay}
      />
      <View style={styles.container}>
        {renderHeader()}
        {renderTitle()}
        {renderListCategory()}
      </View>
    </ImageBackground>
  );
});

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonBack: {
    backgroundColor: '#8e44ad',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonDone: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
    marginTop: 120,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.82)',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  categoryButton: {
    height: 70,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 8,
    margin: 5,
    width: '30%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: '#8e44ad',
  },
  linearButton: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 8,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#8e44ad',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
});

CategoryScreen.displayName = 'CategoryScreen';
export default CategoryScreen;
