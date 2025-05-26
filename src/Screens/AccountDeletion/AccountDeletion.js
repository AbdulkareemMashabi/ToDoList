import Locale from '../../helpers/localization';
import Text from '../../Components/Text/Text';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import {handleAPIErrors, showToast} from '../../helpers/utils';
import {useDispatch} from 'react-redux';
import {setIsLoading} from '../../helpers/Redux/mainReducer';
import Container from '../../Components/Contianer/Container';
import {Images} from '../../assets/Images';
import {deleteAccount, login} from '../../helpers/authServices';

export const AccountDeletion = ({navigation}) => {
  const dispatch = useDispatch();

  const validation = Yup.object().shape({
    email: Yup.string()
      .email(Locale.t('common.emailValidation'))
      .required(Locale.t('common.required')),
    password: Yup.string().required(Locale.t('common.required')),
  });

  const onSubmit = async values => {
    try {
      dispatch(setIsLoading(true));
      await login(values, navigation);
      await deleteAccount(navigation);
      showToast('accountDeletion.successfulDeletion');
      navigation.goBack();
    } catch (e) {
      handleAPIErrors(e);
    } finally {
      dispatch(setIsLoading(false));
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
