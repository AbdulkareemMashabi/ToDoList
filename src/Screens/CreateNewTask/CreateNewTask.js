import {useEffect, useState} from 'react';
import Locale from '../../helpers/localization';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import {getShadow} from '../../helpers/shadow';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetCreateNewTaskBackgrounds,
  setBackgroundColor,
  setIsLoading,
} from '../../helpers/Redux/mainReducer';
import {
  handleAPIErrors,
  pagesNames,
  setTaskToCalendar,
} from '../../helpers/utils';
import {addUserData} from '../../helpers/firebase';
import Container from '../../Components/Contianer/Container';
import styles from './CreateNewTask.style';
import {View} from 'react-native';
import {setImageBackground} from './utils';
import OneLineToggle from '../../Components/OneLineToggle/OneLineToggle';

export const CreateNewTask = ({navigation, route}) => {
  const {userId, backgroundColor, createNewTaskBackgrounds} = useSelector(
    state => state.main,
  );
  const {refreshing} = route.params;
  const [image, setImage] = useState(null);
  const [calendar, setCalendar] = useState(false);
  const [isCalendarAvail, setIsCalendarAvail] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: Locale.t('newTask.newTaskTitle'),
    });

    setImageBackground(setImage);

    return () => {
      dispatch(setBackgroundColor(null));
      if (createNewTaskBackgrounds.length + 1 === 4) {
        dispatch(resetCreateNewTaskBackgrounds());
      }
    };
  }, []);

  const validation = Yup.object().shape({
    title: Yup.string().required(Locale.t('common.required')),
  });

  const onSubmit = async (values, calendarId) => {
    const body = {
      ...values,
      color: backgroundColor,
    };
    if (calendarId) body.calendarId = calendarId;

    try {
      dispatch(setIsLoading(true));
      const docId = await addUserData(userId, body);
      dispatch(setIsLoading(false));
      navigation.replace(pagesNames.taskDetailsScreen, {
        documentId: docId,
        refreshing,
      });
    } catch (e) {
      handleAPIErrors(e);
      dispatch(setIsLoading(false));
    }
  };

  return (
    <Container backgroundImage={image}>
      <View style={[styles.view, getShadow(backgroundColor)]}>
        <Form
          validationSchema={validation}
          fields={[
            {type: 'TextField', name: 'title', label: 'newTask.title'},
            {
              type: 'DatePicker',
              name: 'date',
              label: 'newTask.date',
              onValueChange: v => {
                setIsCalendarAvail(!!v);
              },
            },
            {
              type: 'TextArea',
              name: 'description',
              label: 'newTask.description',
            },
          ]}
          renderFooter={
            isCalendarAvail ? (
              <OneLineToggle
                onColor={backgroundColor}
                style={styles.toggle}
                value={calendar}
                leftText={'common.setTaskInCalendar'}
                onValueChange={v => {
                  setCalendar(v);
                }}
              />
            ) : null
          }
          onSubmit={values =>
            setTaskToCalendar({
              values,
              calendar,
              onSubmit,
            })
          }
        />
      </View>
    </Container>
  );
};

export default CreateNewTask;
