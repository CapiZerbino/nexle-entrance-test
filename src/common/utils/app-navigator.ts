import {
  NavigationContainerRef,
  NavigationProp,
  ParamListBase,
  RouteProp,
  StackActions,
} from '@react-navigation/native';
import React from 'react';
import {ScreenName} from './constants';
import store from '../../app/store';
interface RefObject<T> {
  current: T | null;
}
// NavigationContainer is referred here - Check NavigationStack
export const navigationRootRef =
  React.createRef<NavigationContainerRef<Record<string, never>>>();

declare type ParamList<T> = {
  params: T;
};

export type RouteType<T extends ParamListBase> = RouteProp<
  ParamList<T>,
  'params'
>;

export const routeNameRef: RefObject<string> = React.createRef<string | null>();

export type RootStackParamList = Record<keyof typeof ScreenName, any>;

export type StackNavigation = NavigationProp<RootStackParamList>;

function navigate(name: keyof typeof ScreenName, params?: Record<string, any>) {
  const navigation: StackNavigation =
    navigationRootRef.current as unknown as StackNavigation;
  navigation?.navigate<any>(ScreenName[name], params);
}

function goBack() {
  navigationRootRef.current?.goBack();
}

type ScreenName = keyof typeof ScreenName;
// The screen will navigate to the intended destination after successful login or registration.
export const destinationScreenName: RefObject<ScreenName> =
  React.createRef<ScreenName | null>();

const navigateWithAuthentication = (
  name: keyof typeof ScreenName,
  params?: Record<string, any>,
) => {
  const {isLogined} = store.getState().auth;
  if (isLogined) {
    navigate(name, params);
  } else {
    destinationScreenName.current = name;
    navigate(ScreenName.signup);
  }
};

const navigateToDestination = (params: undefined | Record<string, any>) => {
  const isLoggedIn = store.getState().auth.accessToken;
  if (isLoggedIn && destinationScreenName.current) {
    navigate(destinationScreenName.current, params);
  }
};

const push = (name: keyof typeof ScreenName, params?: Record<string, any>) => {
  navigationRootRef.current?.dispatch(StackActions.push(name, params));
};

const replace = (
  name: keyof typeof ScreenName,
  params?: Record<string, any>,
) => {
  navigationRootRef.current?.dispatch(StackActions.replace(name, params));
};

const popToTopStack = () => {
  if (navigationRootRef.current?.canGoBack()) {
    navigationRootRef.current.dispatch(StackActions.popToTop());
  }
};

export const NavigationService = {
  navigate: navigateWithAuthentication,
  navigateToDestination,
  navigateWithoutAuthentication: navigate,
  goBack,
  replace,
  popToTopStack,
  push,
};
