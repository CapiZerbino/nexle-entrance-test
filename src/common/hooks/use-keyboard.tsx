import React from 'react';
import {Keyboard} from 'react-native';

const useKeyboard = () => {
  const [keyboardVisible, setKeyboardVisible] = React.useState<boolean>(
    Keyboard.isVisible(),
  );
  const [keyboardHeight, setKeyboardHeight] = React.useState<number>(0);

  React.useEffect(() => {
    const _keyboardDidShow = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const _keyboardDidHide = Keyboard.addListener('keyboardDidHide', _e => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      _keyboardDidShow.remove();
      _keyboardDidHide.remove();
    };
  }, []);
  return {keyboardHeight, keyboardVisible};
};

export default useKeyboard;
