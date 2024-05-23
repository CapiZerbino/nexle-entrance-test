import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import React from 'react';
import AppStartup from './app-startup';

import store from '../../app/store';
import {PaperProvider} from 'react-native-paper';

export default function AppSetup() {
  if (!store) {
    return null;
  }
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider>
          <AppStartup />
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
