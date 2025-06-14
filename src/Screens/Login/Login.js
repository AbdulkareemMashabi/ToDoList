import {useEffect} from 'react';
import Text from '../../Components/Text/Text';
import Locale from '../../helpers/localization';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import Button from '../../Components/Button/Button';
import {
  handleAPIErrors,
  hideLoader,
  navigate,
  pagesNames,
  resetNavigation,
  showLoader,
  showToast,
} from '../../helpers/utils';
import Container from '../../Components/Contianer/Container';
import styles from './Login.style';
import {Icons} from '../../assets/Icons';
import {Images} from '../../assets/Images';
import {login, signUpWithId} from '../../helpers/authServices';

export const Login = ({route}) => {
  useEffect(() => {
    route.params.setNavigationBarItems(oldItems => {
      return {
        ...oldItems,
        rightItems: (
          <Button
            containerStyle={styles.deleteButton}
            source={Icons.accountDeletion}
            variant="secondary"
            onPress={() => {
              navigate(pagesNames.deleteAccount);
            }}
          />
        ),
      };
    });
  }, []);

  const validation = Yup.object().shape({
    email: Yup.string()
      .email(Locale.t('common.emailValidation'))
      .required(Locale.t('common.required')),
    password: Yup.string().required(Locale.t('common.required')),
  });

  const routing = () => {
    if (route?.params?.fromDashboard)
      resetNavigation([
        {name: pagesNames.dashboard},
        {name: pagesNames.createNewTask},
      ]);
    else resetNavigation([{name: pagesNames.dashboard}]);
  };

  const onSubmit = async values => {
    try {
      showLoader({isLoadingButton: true});
      await login(values);
      showToast('loginPage.loginSuccessfully');
      hideLoader();
      routing();
    } catch (e) {
      handleAPIErrors(e);
      hideLoader();
    }
  };

  const guestLogin = async () => {
    try {
      showLoader();
      await signUpWithId();
      hideLoader();
      showToast('loginPage.loginSuccessfully');
      routing();
    } catch (e) {
      handleAPIErrors(e);
      hideLoader();
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
              navigate(pagesNames.forgetPassword);
            }}
          />
        }
      />
      <Button
        source={'common.register'}
        variant="secondary"
        onPress={() => {
          navigate(pagesNames.register);
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
