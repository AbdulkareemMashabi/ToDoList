import Locale from '../../helpers/localization';
import Text from '../../Components/Text/Text';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import {
  handleAPIErrors,
  hideLoader,
  navigate,
  pagesNames,
  showLoader,
  showToast,
} from '../../helpers/utils';
import Container from '../../Components/Contianer/Container';
import {Images} from '../../assets/Images';
import {signUp} from '../../helpers/authServices';

export const Register = () => {
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

  const onSubmit = async values => {
    try {
      showLoader({isLoadingButton: true});
      await signUp(values);
      showToast('register.registeredSuccessfully');
      hideLoader();
      navigate(pagesNames.login);
    } catch (e) {
      handleAPIErrors(e);
      hideLoader();
    }
  };

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
        onSubmit={onSubmit}
      />
    </Container>
  );
};

export default Register;
