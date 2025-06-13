import Locale from '../../helpers/localization';
import Text from '../../Components/Text/Text';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import {sendPasswordResetEmail} from 'firebase/auth';
import {
  goBack,
  handleAPIErrors,
  hideLoader,
  showLoader,
  showToast,
} from '../../helpers/utils';
import {auth} from '../../helpers/firebase';
import Container from '../../Components/Contianer/Container';
import {Images} from '../../assets/Images';

export const ForgetPassword = () => {
  const validation = Yup.object().shape({
    email: Yup.string()
      .email(Locale.t('common.emailValidation'))
      .required(Locale.t('common.required')),
  });

  return (
    <Container backgroundImage={Images.waves}>
      <Text localeKey={'forgetPassword.enterEmail'} />
      <Text
        variant={'bodySemibold'}
        color={'grey'}
        localeKey={'forgetPassword.receiveEmail'}
      />
      <Form
        fields={[{type: 'TextField', name: 'email', label: 'common.email'}]}
        validationSchema={validation}
        onSubmit={async values => {
          try {
            showLoader({isLoadingButton: true});
            await sendPasswordResetEmail(auth, values.email);
            showToast('forgetPassword.resetSuccessfully');
            hideLoader();
            goBack();
          } catch (e) {
            handleAPIErrors(e);
            hideLoader();
          }
        }}
      />
    </Container>
  );
};

export default ForgetPassword;
