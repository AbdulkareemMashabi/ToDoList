import {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Locale from '../../helpers/localization';
import Text from '../../Components/Text/Text';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../helpers/firebase';
import {useDispatch} from 'react-redux';
import {setIsLoading, setUserId} from '../../helpers/Redux/mainReducer';
import {handleAPIErrors, showToast} from '../../helpers/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Register = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: Locale.t('register.register'),
    });
  }, []);

  const validation = Yup.object().shape({
    email: Yup.string()
      .email(Locale.t('common.emailValidation'))
      .required(Locale.t('common.required')),
    password: Yup.string()
      .min(6, Locale.t('register.passwordValidation'))
      .required(Locale.t('common.required')),
  });

  return (
    <View style={styles.takingAllPage}>
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
        ]}
        onSubmit={async values => {
          try {
            dispatch(setIsLoading(true));
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password,
            );
            const userId = userCredential.user.uid;
            await AsyncStorage.setItem('userId', userId);
            dispatch(setUserId(userId));
            showToast('register.registeredSuccessfully');
            navigation.popToTop();
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

export default Register;
