import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../Components/Text';
import Locale from '../../helpers/localization';
import Form from '../../Components/Form';
import * as Yup from 'yup';
import Button from '../../Components/Button';
import {handleAPIErrors, pagesNames, showToast} from '../../helpers/utils';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../helpers/firebase';
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setIsLoading} from '../../helpers/Redux/loadingReducer';

export const Login = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: Locale.t('backupPage.backupTitle'),
    });
  }, []);

  const validation = Yup.object().shape({
    email: Yup.string()
      .email(Locale.t('common.emailValidation'))
      .required(Locale.t('common.required')),
    password: Yup.string().required(Locale.t('common.required')),
  });

  return (
    <View style={styles.takingAllPage}>
      <Text localeKey={'backupPage.title'} />
      <Text
        variant={'bodySemibold'}
        isGrey
        localeKey={'backupPage.description'}
      />
      <Form
        fields={[
          {type: 'TextField', name: 'email', label: 'common.email'},
          {type: 'PasswordInput', name: 'password', label: 'common.password'},
        ]}
        validationSchema={validation}
        onSubmit={async values => {
          try {
            dispatch(setIsLoading(true));
            const userCredential = await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password,
            );
            await AsyncStorage.setItem('UID', userCredential.user.uid);
            showToast('backupPage.loginSuccessfully');
            navigation.popToTop();
          } catch (e) {
            handleAPIErrors(e);
          } finally {
            dispatch(setIsLoading(false));
          }
        }}
        buttonLocaleKey={'backupPage.login'}
        renderFooter={
          <Button
            source={'backupPage.forgetPassword'}
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
    </View>
  );
};

const styles = StyleSheet.create({
  takingAllPage: {flex: 1},
  forgetPasswordButton: {alignSelf: 'flex-start'},
});

export default Login;
