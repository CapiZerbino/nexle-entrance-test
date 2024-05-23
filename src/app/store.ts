// store.ts
import {configureStore} from '@reduxjs/toolkit';
import authReducer from './../features/auth/auth-slice';
import categoryReducer from './../features/categories/category-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
