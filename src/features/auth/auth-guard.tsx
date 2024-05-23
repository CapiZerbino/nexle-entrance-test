import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SignupScreen} from '.';
import {ScreenName} from '../../common/utils';
import {CategoryScreen} from '../categories';

const Stack = createNativeStackNavigator();

export const AuthGuardStackName = {
  auth: 'AuthStackNavigator',
  logged: 'LoggedGuard',
};

const AuthGuard = React.memo(() => {
  return (
    <Stack.Navigator initialRouteName={ScreenName.signup}>
      <Stack.Screen
        name={ScreenName.signup}
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenName.categories}
        component={CategoryScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
});

export default AuthGuard;
