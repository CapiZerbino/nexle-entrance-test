import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {AppDispatch, RootState} from '../../../../app/store';
import {signinUser, signupUser} from '../../auth-slice';
import {NavigationService, ScreenName} from '../../../../common/utils';
import {Alert, DimensionValue} from 'react-native';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(18, 'Password must be no more than 18 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one numeric character')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    ),
});
interface PasswordStrength {
  level: string;
  color: string;
  width: DimensionValue;
}
const getPasswordStrength = (password: string): PasswordStrength => {
  if (password.length === 0) {
    return {
      level: '',
      color: 'rgba(255, 255, 255, 0.42)',
      width: '0%',
    };
  }
  if (password.length < 6) {
    return {
      level: 'Too Short',
      color: 'rgba(255, 255, 255, 0.42)',
      width: '0%',
    };
  }
  let score = 0;
  if (/[a-z]/.test(password)) {
    score++;
  }
  if (/[A-Z]/.test(password)) {
    score++;
  }
  if (/\d/.test(password)) {
    score++;
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score++;
  }

  switch (score) {
    case 1:
      return {level: 'Weak', color: 'rgba(224, 81, 81, 1)', width: '25%'};
    case 2:
      return {level: 'Fair', color: 'rgba(227, 160, 99, 1)', width: '50%'};
    case 3:
      return {level: 'Good', color: 'rgba(100, 127, 255, 1)', width: '75%'};
    case 4:
      return {level: 'Strong', color: 'rgba(145, 226, 183, 1)', width: '100%'};
    default:
      return {level: 'Weak', color: 'rgba(255, 255, 255, 0.42)', width: '0%'};
  }
};

interface FormData {
  email: string;
  password: string;
}

export function useSignup() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isOver16, setIsOver16] = useState(false);
  const [password, setPassword] = useState('');
  const authState = useSelector((state: RootState) => state.auth);
  const passwordStrength = getPasswordStrength(password);
  const handleSignUp = async (data: FormData) => {
    if (isOver16) {
      const result = await dispatch(
        signupUser({
          email: data.email,
          password: data.password,
          firstName: 'Tester',
          lastName: 'Mr',
        }),
      );
      if (signupUser.fulfilled.match(result)) {
        const resultSignin = await dispatch(
          signinUser({email: data.email, password: data.password}),
        );
        if (signinUser.fulfilled.match(resultSignin)) {
          NavigationService.navigate(ScreenName.categories);
        } else {
          Alert.alert('Error', 'Sign in failed');
        }
      } else {
        Alert.alert('Error', authState.error || 'Sign up failed');
      }
    }
  };
  return {
    control,
    handleSubmit,
    errors,
    isPasswordVisible,
    setIsPasswordVisible,
    isOver16,
    setIsOver16,
    password,
    setPassword,
    handleSignUp,
    authState,
    passwordStrength,
  };
}
