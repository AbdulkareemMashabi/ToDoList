import {useEffect} from 'react';
import {Formik} from 'formik';
import TextField from './TextField';
import Text from './Text';
import {StyleSheet, View} from 'react-native';
import PasswordInput from './PasswordInput';
import Button from './Button';

export const Form = ({
  validationSchema,
  onSubmit,
  initialValues,
  fields,
  buttonLocaleKey,
  renderFooter,
}) => {
  const additionalInitialValues = {};

  useEffect(() => {
    fields.map(item => {
      if (!initialValues?.[item.name]) additionalInitialValues[item.name] = '';
    });
  }, []);

  return (
    <Formik
      initialValues={{...initialValues, ...additionalInitialValues}}
      onSubmit={values => onSubmit(values)}
      validationSchema={validationSchema}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <>
          <View style={styles.view}>
            {fields.map((item, index) => {
              switch (item.type) {
                case 'TextField':
                  return (
                    <View key={index}>
                      <TextField
                        style={!errors?.[item.name] ? styles.mainField : null}
                        label={item.label}
                        value={values[item.name]}
                        onValueChange={handleChange(item.name)}
                        onBlurField={handleBlur(item.name)}
                      />
                      {errors?.[item.name] ? (
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
                        style={!errors?.[item.name] ? styles.mainField : null}
                        label={item.label}
                        value={values[item.name]}
                        onValueChange={handleChange(item.name)}
                        onBlurField={handleBlur(item.name)}
                      />
                      {errors?.[item.name] ? (
                        <Text
                          style={styles.error}
                          value={errors[item.name]}
                          variant="captionRegular"
                        />
                      ) : null}
                    </View>
                  );
              }
            })}
          </View>
          {renderFooter}
          <Button
            containerStyle={styles.button}
            onPress={handleSubmit}
            source={buttonLocaleKey ? buttonLocaleKey : 'common.submit'}
          />
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  mainField: {
    marginVertical: 16,
  },
  error: {marginTop: 8, marginBottom: 16},
  view: {marginVertical: 16},
  button: {
    marginVertical: 16,
  },
});

export default Form;
