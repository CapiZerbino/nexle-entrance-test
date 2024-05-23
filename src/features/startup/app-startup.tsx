import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {DeviceEventEmitter} from 'react-native';
import {logger, navigationRootRef, routeNameRef} from '../../common/utils';
import {AuthGuard} from '../auth';

const ApplicationNavigator = React.memo(() => {
  return (
    <NavigationContainer
      ref={navigationRootRef}
      onReady={() => {
        routeNameRef.current =
          navigationRootRef.current?.getCurrentRoute()?.name || '';
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName: string =
          navigationRootRef.current?.getCurrentRoute()?.name || '';

        if (previousRouteName !== currentRouteName) {
          logger.log('Navigate to ' + currentRouteName);
        }
        DeviceEventEmitter.emit('currentRouteName', {
          name: currentRouteName,
        });
        routeNameRef.current = currentRouteName || null;
      }}>
      <AuthGuard />
    </NavigationContainer>
  );
});

function AppStartup() {
  // something code here
  return <ApplicationNavigator />;
}

export default AppStartup;
