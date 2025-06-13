import {useEffect, useState} from 'react';
import Locale from '../../helpers/localization';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import {getShadow} from '../../helpers/shadow';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetCreateNewTaskBackgrounds,
  setBackgroundColor,
} from '../../helpers/Redux/mainReducer';
import {
  handleAPIErrors,
  hideLoader,
  pagesNames,
  resetNavigation,
  setTaskToCalendar,
  showLoader,
} from '../../helpers/utils';
import Container from '../../Components/Contianer/Container';
import styles from './CreateNewTask.style';
import {View} from 'react-native';
import {setImageBackground} from './utils';
import OneLineToggle from '../../Components/OneLineToggle/OneLineToggle';
import {createTask} from '../../helpers/taskServices';

export const CreateNewTask = () => {
  const {backgroundColor, createNewTaskBackgrounds} = useSelector(
    state => state.main,
  );
  const [image, setImage] = useState(null);
  const [calendar, setCalendar] = useState(false);
  const [isCalendarAvail, setIsCalendarAvail] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
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

  const onSubmit = async (values, calendarId, showToast) => {
    try {
      showLoader({isLoadingButton: true});

      const {task} =
        (await createTask({calendarId, color: backgroundColor, ...values})) ||
        {};
      showToast?.();
      hideLoader();
      resetNavigation([
        {
          name: pagesNames.dashboard,
        },
        {
          name: pagesNames.taskDetailsScreen,
          params: {
            task,
          },
        },
      ]);
    } catch (e) {
      handleAPIErrors(e);
      hideLoader();
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
