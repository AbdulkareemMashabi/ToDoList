import {useEffect, useState} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import Text from '../Text/Text';
import Locale from '../../helpers/localization';
import {cardShadow} from '../../helpers/shadow';
import {default as RNDatePicker} from 'react-native-date-picker';
import {Icons} from '../../assets/Icons';
import {useSelector} from 'react-redux';
import moment from 'moment';

import styles from './DatePicker.style';

import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const DatePicker = ({
  onValueChange,
  getValueOnChange,
  value,
  label,
  style,
  maximumDate,
  minimumDate,
}) => {
  const [open, setOpen] = useState(false);
  const [dateValue, setDateValue] = useState(
    minimumDate || new Date(moment().format('YYYY-MM-DD')),
  );
  const fontSizeRef = useSharedValue(17);
  const positionRef = useSharedValue(16);

  const {backgroundColor} = useSelector(state => state.main);

  useEffect(() => {
    if (value) {
      let dataObject = value.split('/');
      dataObject = new Date(
        moment(`${dataObject[2]}-${dataObject[1]}-${dataObject[0]}`).format(
          'YYYY-MM-DD',
        ),
      );
      onFocus();
      setDateValue(dataObject);
    }
  }, [value]);

  const onFocus = () => {
    fontSizeRef.value = withTiming(15, {duration: 600});
    positionRef.value = withTiming(0, {duration: 600});
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      fontSize: fontSizeRef.value,
      top: positionRef.value,
    };
  });

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={[styles.touchableOpacity, cardShadow, style]}>
        <Text
          isAnimated
          style={[styles.text, animatedStyles]}
          localeKey={label}
          variant="bodyRegular"
          color={'grey'}
        />
        <Text style={styles.textInput} value={value} variant="bodySemibold" />
        <Image
          source={Icons.calendar}
          tintColor={backgroundColor}
          style={styles.image}
        />
      </TouchableOpacity>
      <RNDatePicker
        theme="light"
        confirmText={Locale.t('common.confirm')}
        cancelText={Locale.t('common.cancel')}
        modal
        locale={Locale.language}
        mode="date"
        title={Locale.t('common.selectDate')}
        maximumDate={maximumDate}
        minimumDate={minimumDate || new Date(moment().format('YYYY-MM-DD'))}
        open={open}
        date={dateValue}
        onConfirm={date => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');

          const fullDate = `${day}/${month}/${year}`;
          onValueChange(fullDate);
          getValueOnChange?.(fullDate);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DatePicker;
