import {useEffect, useState} from 'react';
import {Formik} from 'formik';
import TextField from '../TextField/TextField';
import Text from '../Text/Text';
import {StyleSheet, View} from 'react-native';
import PasswordInput from '../PasswordInput/PasswordInput';
import Button from '../Button/Button';
import {useSelector} from 'react-redux';
import styles from './Form.style';
import {getErrorAndHint} from './utils';

export const Form = ({
  validationSchema,
  onSubmit,
  initialValues,
  fields,
  buttonLocaleKey,
  renderFooter,
}) => {
  const [additionalInitialValues, setAdditionalInitialValues] = useState({});
  const {isLoading} = useSelector(state => state.main);

  useEffect(() => {
    let initialFieldsValues = {};
    fields.map(item => {
      if (!initialValues?.[item.name]) initialFieldsValues[item.name] = '';
    });
    setAdditionalInitialValues(initialFieldsValues);
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={{...initialValues, ...additionalInitialValues}}
      onSubmit={values => {
        onSubmit(values);
      }}
      validationSchema={validationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setTouched,
      }) => (
        <>
          <View style={styles.view}>
            {fields.map((item, index) => {
              switch (item.type) {
                case 'TextField':
                  return (
                    <View key={index}>
                      <TextField
                        style={
                          !touched?.[item.name] || !errors?.[item.name]
                            ? styles.mainField
                            : null
                        }
                        label={item.label}
                        value={values[item.name]}
                        onValueChange={handleChange(item.name)}
                        onBlurField={handleBlur(item.name)}
                      />
                      {getErrorAndHint(touched, errors, item)}
                    </View>
                  );
                case 'PasswordInput':
                  return (
                    <View key={index}>
                      <PasswordInput
                        style={
                          !touched?.[item.name] || !errors?.[item.name]
                            ? styles.mainField
                            : null
                        }
                        label={item.label}
                        value={values[item.name]}
                        onValueChange={handleChange(item.name)}
                        onBlurField={handleBlur(item.name)}
                      />
                      {getErrorAndHint(touched, errors, item)}
                    </View>
                  );
                case 'TextArea':
                  return (
                    <View key={index}>
                      <TextField
                        style={
                          !touched?.[item.name] || !errors?.[item.name]
                            ? styles.textArea
                            : null
                        }
                        label={item.label}
                        value={values[item.name]}
                        onValueChange={handleChange(item.name)}
                        onBlurField={handleBlur(item.name)}
                      />
                      {getErrorAndHint(touched, errors, item)}
                    </View>
                  );
              }
            })}
          </View>
          {renderFooter}
          <Button
            isLoading={isLoading}
            containerStyle={styles.button}
            onPress={v => {
              let touchFields = {};
              fields.map(item => {
                touchFields[item.name] = true;
              });
              setTouched(touchFields);
              handleSubmit(v);
            }}
            source={buttonLocaleKey ? buttonLocaleKey : 'common.submit'}
          />
        </>
      )}
    </Formik>
  );
};

export default Form;
