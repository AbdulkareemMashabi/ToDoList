import {useEffect, useState} from 'react';
import {Formik} from 'formik';
import TextField from '../TextField/TextField';
import {Keyboard, View} from 'react-native';
import PasswordInput from '../PasswordInput/PasswordInput';
import Button from '../Button/Button';
import {useSelector} from 'react-redux';
import styles from './Form.style';
import {getErrorAndHint} from './utils';
import {DatePicker} from '../DatePicker/DatePicker';

export const Form = ({
  validationSchema,
  onSubmit,
  initialValues = {},
  fields = [],
  buttonLocaleKey,
  renderFooter,
}) => {
  const [additionalInitialValues, setAdditionalInitialValues] = useState({});
  const {isLoading, backgroundColor} = useSelector(state => state.main);

  useEffect(() => {
    let initialFieldsValues = {};
    fields?.map(item => {
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
        Keyboard.dismiss();
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
            {fields?.map((item, index) => {
              const hasNotErrorAndHint =
                (!touched?.[item.name] || !errors?.[item.name]) && !item?.hint;

              switch (item.type) {
                case 'TextField':
                  return (
                    <View key={index}>
                      <TextField
                        style={
                          hasNotErrorAndHint
                            ? styles.mainFieldWithoutError
                            : styles.mainFieldWithError
                        }
                        label={item.label}
                        value={values[item.name]}
                        onValueChange={handleChange(item.name)}
                        onBlurField={handleBlur(item.name)}
                        getValueOnChange={item?.onValueChange}
                      />
                      {getErrorAndHint(touched, errors, item)}
                    </View>
                  );
                case 'PasswordInput':
                  return (
                    <View key={index}>
                      <PasswordInput
                        style={
                          hasNotErrorAndHint
                            ? styles.mainFieldWithoutError
                            : styles.mainFieldWithError
                        }
                        label={item.label}
                        value={values[item.name]}
                        onValueChange={handleChange(item.name)}
                        onBlurField={handleBlur(item.name)}
                        getValueOnChange={item?.onValueChange}
                      />
                      {getErrorAndHint(touched, errors, item)}
                    </View>
                  );
                case 'TextArea':
                  return (
                    <View key={index}>
                      <TextField
                        multiline
                        style={[
                          styles.textArea,
                          !hasNotErrorAndHint
                            ? styles.mainFieldWithError
                            : null,
                        ]}
                        label={item.label}
                        value={values[item.name]}
                        onValueChange={handleChange(item.name)}
                        onBlurField={handleBlur(item.name)}
                        getValueOnChange={item?.onValueChange}
                      />
                      {getErrorAndHint(touched, errors, item)}
                    </View>
                  );
                case 'DatePicker':
                  return (
                    <View key={index}>
                      <DatePicker
                        style={
                          hasNotErrorAndHint
                            ? styles.mainFieldWithoutError
                            : styles.mainFieldWithError
                        }
                        label={item.label}
                        value={values[item.name]}
                        maximumDate={item?.maximumDate}
                        minimumDate={item?.minimumDate}
                        onValueChange={handleChange(item.name)}
                        getValueOnChange={item?.onValueChange}
                      />
                      {getErrorAndHint(touched, errors, item)}
                    </View>
                  );
              }
            })}
          </View>
          {renderFooter}
          <Button
            shadowColor={backgroundColor}
            isLoading={isLoading}
            containerStyle={[
              styles.button,
              backgroundColor ? {backgroundColor: backgroundColor} : null,
            ]}
            onPress={v => {
              let touchFields = {};
              fields?.map(item => {
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
