import {useEffect, useState} from 'react';
import {Formik} from 'formik';
import TextField from './TextField';
import Text from './Text';
import {StyleSheet, View} from 'react-native';
import PasswordInput from './PasswordInput';
import Button from './Button';
import {useSelector} from 'react-redux';
import {showToast} from '../helpers/utils';

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
                      {touched?.[item.name] && errors?.[item.name] ? (
                        <Text
                          style={styles.error}
                          value={errors[item.name]}
                          variant="captionRegular"
                        />
                      ) : null}
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
                      {touched?.[item.name] && errors?.[item.name] ? (
                        <Text
                          style={styles.error}
                          value={errors[item.name]}
                          variant="captionRegular"
                        />
                      ) : null}
                      {(!touched?.[item.name] || !errors?.[item.name]) &&
                      item?.hint ? (
                        <Text
                          localeKey={item.hint}
                          variant="captionRegular"
                          isGrey
                        />
                      ) : null}
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

const styles = StyleSheet.create({
  mainField: {
    marginVertical: 8,
  },
  error: {marginTop: 8, marginBottom: 16},
  view: {marginVertical: 16},
  button: {
    marginVertical: 16,
  },
});

export default Form;
