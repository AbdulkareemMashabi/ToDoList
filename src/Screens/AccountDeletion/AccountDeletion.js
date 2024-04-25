import {useEffect} from 'react';
import Locale from '../../helpers/localization';
import Text from '../../Components/Text/Text';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import {deleteUser, getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {handleAPIErrors, showToast} from '../../helpers/utils';
import {useDispatch} from 'react-redux';
import {setIsLoading} from '../../helpers/Redux/mainReducer';
import {auth} from '../../helpers/firebase';
import Container from '../../Components/Contianer/Container';

export const AccountDeletion = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: Locale.t('accountDeletion.accountDeletion'),
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
      <Text localeKey={'accountDeletion.message'} />

      <Form
        fields={[
          {type: 'TextField', name: 'email', label: 'common.email'},
          {type: 'PasswordInput', name: 'password', label: 'common.password'},
        ]}
        validationSchema={validation}
        onSubmit={async values => {
          try {
            dispatch(setIsLoading(true));
            await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password,
            );
            const _auth = getAuth();
            const user = _auth.currentUser;
            await deleteUser(user);
            showToast('accountDeletion.successfulDeletion');
            navigation.goBack();
          } catch (e) {
            handleAPIErrors(e);
          } finally {
            dispatch(setIsLoading(false));
          }
        }}
        buttonLocaleKey={'common.confirm'}
      />
    </Container>
  );
};

export default AccountDeletion;
