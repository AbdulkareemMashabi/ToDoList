import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Text from '../Text/Text';
import Locale from '../../helpers/localization';
import {getShadow} from '../../helpers/shadow';
import {default as RNDatePicker} from 'react-native-date-picker';

export const DatePicker = ({onValueChange, value, label, style}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const fontSizeRef = useRef(new Animated.Value(17)).current;
  const positionRef = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    if (value) {
      let dataObject = value.split('/');
      dataObject = new Date(dataObject[2], dataObject[1], dataObject[0]);
      onFocus();
      setDate(dataObject);
    }
  }, [value]);

  const onFocus = () => {
    Animated.parallel([
      Animated.timing(fontSizeRef, {
        toValue: 15,
        duration: 400,
        useNativeDriver: false,
      }).start(),
      Animated.timing(positionRef, {
        toValue: 2,
        duration: 400,
        useNativeDriver: false,
      }).start(),
    ]);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={[styles.touchableOpacity, getShadow('white'), style]}>
        <Text
          style={[styles.text, {fontSize: fontSizeRef, top: positionRef}]}
          localeKey={label}
          variant="bodyRegular"
        />
        <Text
          style={[
            styles.textInput,
            {textAlign: Locale.isRTL ? 'right' : 'left'},
          ]}
          value={value || ''}
          variant="bodySemibold"
        />
      </TouchableOpacity>
      <RNDatePicker
        style={{backgroundColor: 'red'}}
        modal
        locale={Locale.language}
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');

          const fullDate = `${day}/${month}/${year}`;
          onValueChange(fullDate);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    zIndex: 1,
    left: 16,
    position: 'absolute',
  },
  textInput: {
    width: '100%',
    color: 'black',
  },
  touchableOpacity: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
  },
});

export default DatePicker;
