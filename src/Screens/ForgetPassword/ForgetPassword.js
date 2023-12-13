import {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Locale from '../../helpers/localization';
import Text from '../../Components/Text';
import Form from '../../Components/Form';
import * as Yup from 'yup';
import {sendPasswordResetEmail} from 'firebase/auth';
import {handleAPIErrors, showToast} from '../../helpers/utils';
import {useDispatch} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {setIsLoading} from '../../helpers/Redux/loadingReducer';
import {auth} from '../../helpers/firebase';

export const ForgetPassword = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: Locale.t('forgetPassword.forgetPassword'),
    });
  }, []);

  const validation = Yup.object().shape({
    email: Yup.string()
      .email(Locale.t('common.emailValidation'))
      .required(Locale.t('common.required')),
  });

  return (
    <View style={styles.takingAllPage}>
      <Text localeKey={'forgetPassword.enterEmail'} />
      <Text
        variant={'bodySemibold'}
        isGrey
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
            navigation.goBack();
          } catch (e) {
            handleAPIErrors(e);
          } finally {
            dispatch(setIsLoading(false));
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  takingAllPage: {flex: 1},
  forgetPasswordButton: {alignSelf: 'flex-start'},
});

export default ForgetPassword;
