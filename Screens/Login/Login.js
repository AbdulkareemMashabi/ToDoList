import {useEffect} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import Text from '../../Components/Text';
import {Images} from '../../assets/Images';
import Locale from '../../helpers/localization';
import Form from '../../Components/Form';
import * as Yup from 'yup';
import Button from '../../Components/Button';

export const Login = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: Locale.t('backupPage.backupTitle'),
    });
  }, []);

  // const validation = Yup.object().shape({
  //   userName: Yup.string().required('Required'),
  //   password: Yup.string(),
  // });

  return (
    <ImageBackground style={styles.takingAllPage} source={Images.waves}>
      <Text localeKey={'backupPage.title'} />
      <Text
        variant={'bodySemibold'}
        isGrey
        localeKey={'backupPage.description'}
      />
      <Form
        fields={[
          {type: 'TextField', name: 'userName', label: 'common.userName'},
          {type: 'PasswordInput', name: 'password', label: 'common.password'},
        ]}
        // initialValues={{userName: 'ali'}}
        // validationSchema={validation}
        // onSubmit={v => {
        //   console.log(v);
        // }}
        buttonLocaleKey={'backupPage.login'}
        renderFooter={
          <Button
            source={'backupPage.forgetPassword'}
            variant="secondary"
            containerStyle={styles.forgetPasswordButton}
            onPress={() => {
              navigation.push('ForgetPassword');
            }}
          />
        }
      />
      <Button
        source={'common.register'}
        variant="secondary"
        onPress={() => {
          navigation.push('ForgetPassword');
        }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  takingAllPage: {flex: 1},
  forgetPasswordButton: {alignSelf: 'flex-start'},
});

export default Login;
