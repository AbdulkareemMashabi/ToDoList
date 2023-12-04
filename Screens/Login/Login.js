import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../Components/Text';
import Locale from '../../helpers/localization';
import Form from '../../Components/Form';
import * as Yup from 'yup';
import Button from '../../Components/Button';
import {pagesNames} from '../../helpers/utils';

export const Login = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: Locale.t('backupPage.backupTitle'),
    });
  }, []);

  const validation = Yup.object().shape({
    userName: Yup.string().required(Locale.t('common.required')),
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
          {type: 'TextField', name: 'userName', label: 'common.userName'},
          {type: 'PasswordInput', name: 'password', label: 'common.password'},
        ]}
        validationSchema={validation}
        onSubmit={v => {
          console.log(v);
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
