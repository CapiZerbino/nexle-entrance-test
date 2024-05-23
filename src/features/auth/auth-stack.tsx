import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SignupScreen} from './components/signup';
import {ScreenName} from '../../common/utils';

const AuthStack = createNativeStackNavigator();
export const AuthStackNavigator = React.memo(() => {
  //   const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ScreenName.signup}>
      <AuthStack.Screen
        name={ScreenName.signup}
        component={SignupScreen}
        options={
          {
            //   animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          }
        }
      />
    </AuthStack.Navigator>
  );
});
