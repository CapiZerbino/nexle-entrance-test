import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {useCallback, useEffect, useState} from 'react';
import {fetchCategories} from './category-slice';
import {NavigationService} from '../../common/utils';

export function useCategories() {
  const dispatch = useDispatch<AppDispatch>();
  const {categories, loading, error} = useSelector(
    (state: RootState) => state.categories,
  );
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prevState => {
      if (prevState.includes(categoryId)) {
        return prevState.filter(cat => cat !== categoryId);
      } else {
        return [...prevState, categoryId];
      }
    });
  };

  const isCategorySelected = (categoryId: number) => {
    return selectedCategories.includes(categoryId);
  };

  const handleDone = useCallback(() => {
    console.log('Selected Categories:', selectedCategories);
  }, [selectedCategories]);

  const handleBack = useCallback(() => {
    NavigationService.goBack();
  }, []);

  return {
    categories,
    loading,
    error,
    selectedCategories,
    toggleCategory,
    isCategorySelected,
    handleDone,
    handleBack,
  };
}
