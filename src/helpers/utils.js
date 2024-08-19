import {
  Alert,
  Image,
  Linking,
  Platform,
  View,
  NativeModules,
} from 'react-native';
import Locale from './localization';
import {Icons} from '../assets/Icons';
import Text from '../Components/Text/Text';
import Toast from 'react-native-toast-message';
import RNCalendarEvents from 'react-native-calendar-events';
import AndroidOpenSettings from 'react-native-android-open-settings';
import {store} from './Redux/store';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

export const pagesNames = {
  lottie: 'Lottie',
  dashboard: 'Dashboard',
  login: 'Login',
  register: 'Register',
  forgetPassword: 'ForgetPassword',
  createNewTask: 'CreateNewTask',
  taskDetailsScreen: 'TaskDetailsScreen',
  popUp: 'PopUp',
  deleteAccount: 'deleteAccount',
};

export const pagesUseWaveImage = [
  pagesNames.login,
  pagesNames.register,
  pagesNames.forgetPassword,
  pagesNames.deleteAccount,
];

const errorMessages = {
  'email-already-in-use': 'APIErrorMessages.emailUsed',
  'weak-password': 'APIErrorMessages.weakPassword',
  'invalid-credential': 'APIErrorMessages.invalidUser',
};

export const backgroundColors = {
  blue: '#32ADE6',
  red: '#FF3B30',
  green: '#34C759',
  orange: '#FF9500',
};

export const RESULT_PERMISSION = Object.freeze({
  DENIED: 'denied',
  RESTRICTED: 'restricted',
  AUTHORIZED: 'authorized',
  UNDETERMINED: 'undetermined',
});

export const shadowColors = {
  ...backgroundColors,
  blue: '#0387D1',
};

export const handleAPIErrors = error => {
  const message = errorMessages?.[error?.code?.split('/')[1]];
  Alert.alert(
    Locale.t('common.errorOccurred'),
    Locale.t(message || 'APIErrorMessages.generalError'),
  );
};

export const toastConfig = {
  success: props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#30D158',
          alignItems: 'center',
          borderRadius: 16,
          paddingVertical: 6,
          paddingHorizontal: 10,
          marginHorizontal: 20,
        }}>
        <Image
          source={props.props.image || Icons.checkMark}
          style={{marginHorizontal: 10}}
          tintColor={'white'}
        />
        <Text color={'white'} localeKey={props.text1} variant="bodySemibold" />
      </View>
    );
  },
};

export const showToast = (text, props) => {
  Toast.show({
    type: 'success',
    position: 'top',
    text1: text,
    props,
  });
};

export const isNil = value => {
  return value === null || value === undefined;
};

export const setTaskToCalendar = async ({
  values,
  calendar,
  onSubmit,
  mainTask,
}) => {
  // if calendar toggle is enabled
  if (calendar) {
    const permissionResult = await RNCalendarEvents.checkPermissions();

    switch (permissionResult) {
      case RESULT_PERMISSION.UNDETERMINED: // if the permission is not requested before
        const requestedPermission = await RNCalendarEvents.requestPermissions();
        if (
          [RESULT_PERMISSION.AUTHORIZED, RESULT_PERMISSION.RESTRICTED].includes(
            requestedPermission,
          )
        ) {
          // authorized
          if (mainTask) onSubmit(values);
          else setInCalendar(values, onSubmit);
        } else {
          // not authorized
          onSubmit(values);
        }
        break;

      case RESULT_PERMISSION.AUTHORIZED:
      case RESULT_PERMISSION.RESTRICTED:
        if (mainTask) onSubmit(values);
        else setInCalendar(values, onSubmit);
        break;

      default:
        Alert.alert(null, Locale.t('common.accessDenied'), [
          {
            text: Locale.t('common.openSettings'),
            onPress: () => {
              Platform.OS === 'ios'
                ? Linking.openURL('app-settings:')
                : AndroidOpenSettings.locationSourceSettings();
            },
          },
        ]);

        break;
    }
  } else onSubmit(values);
};

export const setInCalendar = async (values, onSubmit) => {
  try {
    const {calendarId, title, description, date} = values || {};
    const arrDate = date.split('/');
    const endDate = new Date(
      `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}T18:00:00.000Z`,
    );

    const body = {
      title: title,
      startDate: new Date().toISOString(),
      endDate: endDate.toISOString(),
      notes: description || '',
      description: description || '',
    };

    //check if endDate is today date
    if (checkIfSelectedIsTodayDate(endDate))
      body.startDate = new Date(Date.now() - 864e5).toISOString(); // set to yesterday date

    if (calendarId) body.id = calendarId;

    const setToCalendar = await RNCalendarEvents.saveEvent(values.title, body);

    if (setToCalendar) {
      onSubmit(values, setToCalendar, () => {
        showToast(
          `common.${calendarId ? 'editedSuccessfully' : 'addedSuccessfully'}`,
          {image: Icons.calendar},
        );
      });
    }
  } catch (e) {
    handleAPIErrors(e);
  }
};

export const checkIfSelectedIsTodayDate = date => {
  return new Date().toDateString() === date.toDateString();
};

export const dispatch = v => {
  store.dispatch(v);
};

export const reloadWidgetContent = () => {
  NativeModules.WidgetRefresh.refreshWidget();
};

export const setSharedData = async data => {
  if (Platform.OS !== 'ios') {
    return;
  }
  await SharedGroupPreferences.setItem(
    'toDoListAbdulkareem',
    data || {},
    'group.abdulkareemMashabi',
  );
  reloadWidgetContent();
};
