import {useEffect} from 'react';
import Text from '../../Components/Text/Text';
import Locale from '../../helpers/localization';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import Button from '../../Components/Button/Button';
import {handleAPIErrors, pagesNames, showToast} from '../../helpers/utils';
import {useDispatch} from 'react-redux';
import {
  setIsLoading,
  setIsLoadingOverLay,
} from '../../helpers/Redux/mainReducer';
import Container from '../../Components/Contianer/Container';
import styles from './Login.style';
import {Icons} from '../../assets/Icons';
import {Images} from '../../assets/Images';
import {login, signUpWithId} from '../../helpers/authServices';

export const Login = ({navigation, route}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          containerStyle={styles.deleteButton}
          source={Icons.accountDeletion}
          variant="secondary"
          onPress={() => {
            navigation.push(pagesNames.deleteAccount);
          }}
        />
      ),
    });
  }, []);

  const validation = Yup.object().shape({
    email: Yup.string()
      .email(Locale.t('common.emailValidation'))
      .required(Locale.t('common.required')),
    password: Yup.string().required(Locale.t('common.required')),
  });

  const routing = () => {
    if (route?.params?.routing) route.params.routing();
    else
      navigation.reset({
        index: 0, // Set the first screen in the stack
        routes: [{name: pagesNames.dashboard}], // Replace stack with "Home" screen
      });
  };

  const onSubmit = async values => {
    try {
      dispatch(setIsLoading(true));
      await login(values, navigation);
      showToast('loginPage.loginSuccessfully');
      dispatch(setIsLoading(false));
      routing();
    } catch (e) {
      handleAPIErrors(e);
      dispatch(setIsLoading(false));
    }
  };

  const guestLogin = async () => {
    try {
      dispatch(setIsLoadingOverLay(true));
      await signUpWithId(navigation);
      dispatch(setIsLoadingOverLay(false));
      showToast('loginPage.loginSuccessfully');
      routing();
    } catch (e) {
      handleAPIErrors(e);
      dispatch(setIsLoadingOverLay(false));
    }
  };

  return (
    <Container backgroundImage={Images.waves}>
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
        onSubmit={onSubmit}
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
      <Button
        boldText
        source={'common.guestLogin'}
        icon={Icons.userLogo}
        containerStyle={styles.guest}
        variant="iconWithText"
        onPress={guestLogin}
      />
    </Container>
  );
};

export default Login;
