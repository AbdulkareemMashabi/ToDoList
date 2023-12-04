import {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Locale from '../../helpers/localization';
import Text from '../../Components/Text';
import Form from '../../Components/Form';
import * as Yup from 'yup';

export const Register = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: Locale.t('register.register'),
    });
  }, []);

  const validation = Yup.object().shape({
    userName: Yup.string().required(Locale.t('common.required')),
    email: Yup.string().required(Locale.t('common.required')),
    password: Yup.string().required(Locale.t('common.required')),
  });

  return (
    <View style={styles.takingAllPage}>
      <Text localeKey={'register.register'} />
      <Form
        validationSchema={validation}
        fields={[
          {type: 'TextField', name: 'userName', label: 'common.userName'},
          {type: 'TextField', name: 'email', label: 'common.email'},
          {type: 'PasswordInput', name: 'password', label: 'common.password'},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  takingAllPage: {flex: 1},
  forgetPasswordButton: {alignSelf: 'flex-start'},
});

export default Register;
