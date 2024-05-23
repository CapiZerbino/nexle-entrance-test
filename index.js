/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {enableScreens, enableFreeze} from 'react-native-screens';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import App from './src';

enableScreens(true);
enableFreeze(true);
AppRegistry.registerComponent(appName, () =>
  gestureHandlerRootHOC(App, {flex: 1}),
);
