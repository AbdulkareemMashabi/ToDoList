import {useEffect} from 'react';
import Text from '../../Components/Text/Text';
import Locale from '../../helpers/localization';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import Button from '../../Components/Button/Button';
import {handleAPIErrors, pagesNames, showToast} from '../../helpers/utils';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../helpers/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setIsLoading, setUserId} from '../../helpers/Redux/mainReducer';
import Container from '../../Components/Contianer/Container';
import styles from './Login.style';

export const Login = ({navigation, route}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: Locale.t('loginPage.loginTitle'),
    });
  }, []);

  const validation = Yup.object().shape({
    email: Yup.string()
      .email(Locale.t('common.emailValidation'))
      .required(Locale.t('common.required')),
    password: Yup.string().required(Locale.t('common.required')),
  });

  return (
    <Container>
      <Text localeKey={'loginPage.title'} />
      <Text
        variant={'bodySemibold'}
        color={'grey'}
        localeKey={'loginPage.description'}
      />
      <Form
        fields={[
          {type: 'TextField', name: 'email', label: 'common.email'},
          {type: 'PasswordInput', name: 'password', label: 'common.password'},
        ]}
        validationSchema={validation}
        onSubmit={async values => {
          try {
            dispatch(setIsLoading(true));
            const userCredential = await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password,
            );
            const userId = userCredential.user.uid;
            await AsyncStorage.setItem('userId', userId);
            dispatch(setUserId(userId));
            showToast('loginPage.loginSuccessfully');
            dispatch(setIsLoading(false));
            if (route?.params?.routing) route.params.routing();
            else navigation.navigate(pagesNames.dashboard);
          } catch (e) {
            handleAPIErrors(e);
            dispatch(setIsLoading(false));
          }
        }}
        buttonLocaleKey={'loginPage.login'}
        renderFooter={
          <Button
            source={'loginPage.forgetPassword'}
            variant="secondary"
            containerStyle={styles.forgetPasswordButton}
            onPress={() => {
              navigation.push(pagesNames.forgetPassword);
            }}
          />
        }
      />
      <Button
        source={'common.register'}
        variant="secondary"
        onPress={() => {
          navigation.push(pagesNames.register);
        }}
      />
    </Container>
  );
};

export default Login;
