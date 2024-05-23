import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {Controller} from 'react-hook-form';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import {useSignup} from './use-sign-up';
import {AppColors} from '../../../../common/utils';
import {IconButton, TextInput} from 'react-native-paper';

const SignupScreen = React.memo(() => {
  const {
    control,
    handleSubmit,
    errors,
    isPasswordVisible,
    setIsPasswordVisible,
    isOver16,
    setIsOver16,
    passwordStrength,
    setPassword,
    handleSignUp,
    authState,
  } = useSignup();

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['80%'], []);

  const renderFormSignup = () => (
    <>
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            label="Your email"
            textColor="white"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <View style={styles.passwordContainer}>
              <TextInput
                label="Your password"
                value={value}
                onChangeText={text => {
                  onChange(text);
                  setPassword(text);
                }}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                textColor="white"
                onBlur={onBlur}
                style={styles.input}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                }
              />
            </View>
            <View style={styles.strengthBarContainer}>
              <View style={styles.baseBar} />
              <View
                style={[
                  styles.strengthBar,
                  {
                    width: passwordStrength.width,
                    backgroundColor: passwordStrength.color,
                  },
                ]}
              />
            </View>
            {passwordStrength.level && (
              <Text
                style={[styles.passwordLevel, {color: passwordStrength.color}]}>
                {passwordStrength.level}
              </Text>
            )}
          </View>
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
    </>
  );

  const renderCheckboxOver16 = () => (
    <View style={styles.checkboxContainer}>
      <CheckBox
        value={isOver16}
        onValueChange={setIsOver16}
        tintColors={{true: 'white', false: '#647FFF'}}
      />
      <Text style={styles.checkboxText}>I am over 16 years of age</Text>
    </View>
  );

  const renderTerms = () => (
    <Text style={styles.terms}>
      By clicking Sign Up, you are indicating that you have read and agree to
      the <Text style={styles.link}>Terms of Service</Text> and{' '}
      <Text style={styles.link}>Privacy Policy</Text>.
    </Text>
  );

  const renderSubmit = () => (
    <View style={styles.signupButtonContainer}>
      <Text style={styles.buttonText}>Sign Up</Text>
      {authState.loading ? (
        <ActivityIndicator />
      ) : (
        <IconButton
          icon="arrow-right"
          size={40}
          mode="outlined"
          iconColor={!isOver16 ? '#888' : 'white'}
          style={[styles.buttonSubmit, !isOver16 && {borderColor: '#888'}]}
          onPress={handleSubmit(handleSignUp)}
          disabled={!isOver16}
        />
      )}
    </View>
  );

  return (
    <ImageBackground
      source={require('./../../../../common/assets/images/signup_background.png')}
      style={styles.background}
      resizeMode="cover">
      <LinearGradient
        colors={AppColors.getInstance().getGradientBlackColors()}
        style={styles.overlay}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        keyboardBlurBehavior="restore"
        style={styles.bottomSheetBackground}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetIndicator}>
        <BottomSheetScrollView
          style={styles.bottomSheetBackground}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}>
          <View style={styles.formContainer}>
            <Text style={styles.header}>Let's get you started!</Text>
            {renderFormSignup()}
            {renderCheckboxOver16()}
            {renderTerms()}
            {renderSubmit()}
            {authState.statusMessage && (
              <Text style={styles.statusMessage}>
                {authState.statusMessage}
              </Text>
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </ImageBackground>
  );
});

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 24,
  },
  header: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    height: 60,
    borderColor: '#647FFF',
    borderBottomWidth: 1,
    marginTop: 20,
    color: '#fff',
    width: '100%',
    backgroundColor: 'transparent',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSubmit: {
    borderRadius: 100,
    borderColor: '#647FFF',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  checkboxText: {
    color: '#fff',
    marginLeft: 8,
  },
  terms: {
    color: '#888',
    marginBottom: 20,
  },
  passwordLevel: {
    alignSelf: 'flex-end',
    fontSize: 12,
  },
  link: {
    color: '#647FFF',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 100,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#647FFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  bottomSheetIndicator: {
    display: 'none',
  },
  bottomSheetBackground: {
    backgroundColor: 'none',
  },
  signupButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  strengthBarContainer: {
    position: 'relative',
    height: 1,
    marginTop: -1,
  },
  baseBar: {
    height: 1,
    backgroundColor: '#888',
    width: '100%',
    position: 'absolute',
  },
  strengthBar: {
    height: 2,
    position: 'absolute',
  },
  statusMessage: {
    color: 'white',
  },
});

SignupScreen.displayName = 'SignupScreen';

export default SignupScreen;
