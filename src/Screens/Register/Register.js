import {useEffect} from 'react';
import Locale from '../../helpers/localization';
import Text from '../../Components/Text/Text';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../helpers/firebase';
import {useDispatch} from 'react-redux';
import {setIsLoading, setUserId} from '../../helpers/Redux/mainReducer';
import {handleAPIErrors, pagesNames, showToast} from '../../helpers/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '../../Components/Contianer/Container';
import {Images} from '../../assets/Images';

export const Register = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: Locale.t('register.register'),
    });
  }, []);

  const validation = Yup.object().shape({
    email: Yup.string()
      .email(Locale.t('common.emailValidation'))
      .required(Locale.t('common.required')),
    password: Yup.string()
      .min(6, Locale.t('register.passwordValidation'))
      .required(Locale.t('common.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], Locale.t('common.matchPassword'))
      .required(Locale.t('common.required')),
  });

  return (
    <Container backgroundImage={Images.waves}>
      <Text localeKey={'register.register'} />
      <Form
        validationSchema={validation}
        fields={[
          {type: 'TextField', name: 'email', label: 'common.email'},
          {
            type: 'PasswordInput',
            name: 'password',
            label: 'common.password',
            hint: 'register.passwordValidation',
          },
          {
            type: 'PasswordInput',
            name: 'confirmPassword',
            label: 'common.confirmPassword',
          },
        ]}
        onSubmit={async values => {
          try {
            dispatch(setIsLoading(true));
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password,
            );
            const userId = userCredential.user.uid;
            await AsyncStorage.setItem('userId', userId);
            dispatch(setUserId(userId));
            showToast('register.registeredSuccessfully');
            dispatch(setIsLoading(false));
            navigation.navigate(pagesNames.dashboard);
          } catch (e) {
            handleAPIErrors(e);
            dispatch(setIsLoading(false));
          }
        }}
      />
    </Container>
  );
};

export default Register;
