import Locale from '../../helpers/localization';
import Text from '../../Components/Text/Text';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import {sendPasswordResetEmail} from 'firebase/auth';
import {handleAPIErrors, showToast} from '../../helpers/utils';
import {useDispatch} from 'react-redux';
import {setIsLoading} from '../../helpers/Redux/mainReducer';
import {auth} from '../../helpers/firebase';
import Container from '../../Components/Contianer/Container';
import {Images} from '../../assets/Images';

export const ForgetPassword = ({navigation}) => {
  const dispatch = useDispatch();

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
            dispatch(setIsLoading(true));
            await sendPasswordResetEmail(auth, values.email);
            showToast('forgetPassword.resetSuccessfully');
            dispatch(setIsLoading(false));
            navigation.goBack();
          } catch (e) {
            handleAPIErrors(e);
            dispatch(setIsLoading(false));
          }
        }}
      />
    </Container>
  );
};

export default ForgetPassword;
