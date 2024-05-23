import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import {ScreenName} from '../../common/utils';
import {CategoryScreen} from '../categories';

const Stack = createNativeStackNavigator();
function LoggedGuard() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ScreenName.categories}>
      <Stack.Screen name={ScreenName.categories} component={CategoryScreen} />
    </Stack.Navigator>
  );
}

export default React.memo(LoggedGuard);
