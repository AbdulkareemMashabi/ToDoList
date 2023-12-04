import {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Locale from '../../helpers/localization';
import Text from '../../Components/Text';
import Form from '../../Components/Form';
import * as Yup from 'yup';

export const ForgetPassword = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: Locale.t('forgetPassword.forgetPassword'),
    });
  }, []);

  const validation = Yup.object().shape({
    email: Yup.string().required(Locale.t('common.required')),
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  takingAllPage: {flex: 1},
  forgetPasswordButton: {alignSelf: 'flex-start'},
});

export default ForgetPassword;
