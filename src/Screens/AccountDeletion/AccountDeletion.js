import Locale from '../../helpers/localization';
import Text from '../../Components/Text/Text';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import {
  goBack,
  handleAPIErrors,
  hideLoader,
  showLoader,
  showToast,
} from '../../helpers/utils';
import Container from '../../Components/Contianer/Container';
import {Images} from '../../assets/Images';
import {deleteAccount, login} from '../../helpers/authServices';

export const AccountDeletion = () => {
  const validation = Yup.object().shape({
    email: Yup.string()
      .email(Locale.t('common.emailValidation'))
      .required(Locale.t('common.required')),
    password: Yup.string().required(Locale.t('common.required')),
  });

  const onSubmit = async values => {
    try {
      showLoader({isLoadingButton: true});
      await login(values);
      await deleteAccount();
      showToast('accountDeletion.successfulDeletion');
      goBack();
    } catch (e) {
      handleAPIErrors(e);
    } finally {
      hideLoader();
    }
  };

  return (
    <Container backgroundImage={Images.waves}>
      <Text localeKey={'accountDeletion.message'} />

      <Form
        fields={[
          {type: 'TextField', name: 'email', label: 'common.email'},
          {type: 'PasswordInput', name: 'password', label: 'common.password'},
        ]}
        validationSchema={validation}
        onSubmit={onSubmit}
        buttonLocaleKey={'common.confirm'}
      />
    </Container>
  );
};

export default AccountDeletion;
