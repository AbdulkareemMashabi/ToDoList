import {useEffect, useState} from 'react';
import {FlatList, Platform, View} from 'react-native';
import {
  RESULT_PERMISSION,
  goBack,
  handleAPIErrors,
  hideLoader,
  setInCalendar,
  setSharedData,
  setTaskToCalendar,
  showLoader,
} from '../../helpers/utils';
import DoubleText from '../../Components/DoubleText/DoubleText';
import styles from './TaskDetailsScreen.style';
import ActionsSheet from '../../Components/ActionsSheet/ActionsSheet';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import Locale from '../../helpers/localization';
import {getFormFields, getInitialValues} from './utils';
import Text from '../../Components/Text/Text';
import Container from '../../Components/Contianer/Container';
import SubTask from '../../Components/SubTask/SubTask';
import TextField from '../../Components/TextField/TextField';
import Button from '../../Components/Button/Button';
import {Icons} from '../../assets/Icons';
import OneLineToggle from '../../Components/OneLineToggle/OneLineToggle';
import RNCalendarEvents from 'react-native-calendar-events';
import {updateTask} from '../../helpers/taskServices';

export const TaskDetailsScreen = ({navigation, route}) => {
  const {task} = route.params;
  const {date: initialDate, calendarId: initialCalendarId, _id} = task || {};
  const [formData, setFormData] = useState(task);
  const [openMainForm, setOpenMainForm] = useState(false);
  const [mainTaskSubmitted, setMainTaskSubmitted] = useState(false);
  const [newSubTask, setNewSubTask] = useState('');
  const [enableDoneButton, setEnableDonButton] = useState(false);
  const [calendar, setCalendar] = useState(initialCalendarId);
  const [isCalendarAvail, setIsCalendarAvail] = useState(initialDate);

  const {title, date, status, description, calendarId, subTasks} =
    formData || {};

  const validation = Yup.object().shape({
    title: Yup.string().required(Locale.t('common.required')),
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => {
        return enableDoneButton ? (
          <Button
            source={'taskDetails.Done'}
            variant="secondary"
            containerStyle={styles.doneButton}
            onPress={setCalendarFun}
          />
        ) : null;
      },
      headerLeft: () => (
        <Button
          flipRTL={Platform.OS === 'ios'}
          source={Platform.OS === 'ios' ? Icons.backButton : Icons.arrow}
          onPress={setCalendarFun}
        />
      ),
    });
  }, [enableDoneButton, formData, setCalendarFun, calendar, mainTaskSubmitted]);

  const submit = async (_, calendarId, showToast) => {
    if (enableDoneButton)
      try {
        const finalCalendarId = calendarId || calendar;
        showLoader();
        const newValues = {
          ...formData,
          calendarId: finalCalendarId ? finalCalendarId : null,
        };
        await updateTask({taskId: _id, newValues});
        if (calendarId) showToast?.();
        if (formData.favorite) {
          setSharedData(newValues);
        }
        hideLoader();
        goBack();
      } catch (e) {
        handleAPIErrors(e);
        hideLoader();
      }
    else {
      goBack();
    }
  };

  const setCalendarFun = () => {
    if (calendar && enableDoneButton && mainTaskSubmitted) {
      setInCalendar(formData, submit);
    } else submit();
  };

  const textFieldBlur = () => {
    if (newSubTask) {
      let finalValues = {};
      finalValues = {subTasks: subTasks.slice()};
      finalValues.subTasks.push({
        title: newSubTask,
        status: false,
      });
      setFormData({...formData, ...finalValues});
      setEnableDonButton(true);
      setNewSubTask('');
    }
  };

  const deleteTask = index => {
    let finalValues = {};
    finalValues = {
      subTasks: subTasks.slice(),
    };
    finalValues.subTasks.splice(index, 1);

    setFormData({...formData, ...finalValues});
    setEnableDonButton(true);
  };

  const onSubmit = async values => {
    const finalValues = {
      ...formData,
      ...values,
      status: false,
    };
    setFormData({...formData, ...finalValues});
    setEnableDonButton(true);
    setMainTaskSubmitted(true);
    setOpenMainForm(false);
    if (calendar) {
      const permissionResult = await RNCalendarEvents.checkPermissions();
      if (
        ![RESULT_PERMISSION.AUTHORIZED, RESULT_PERMISSION.RESTRICTED].includes(
          permissionResult,
        )
      )
        setCalendar(false);
    }
  };

  const footer = () => {
    if (status) return null;
    return (
      <TextField
        withoutShadow
        style={styles.textField}
        label={'taskDetails.newSub'}
        onBlurField={textFieldBlur}
        onValueChange={setNewSubTask}
        value={newSubTask}
      />
    );
  };

  return (
    <Container>
      <DoubleText
        done={status}
        title={title}
        description={description}
        date={date}
        editButtonPress={
          !status
            ? () => {
                setOpenMainForm(true);
              }
            : null
        }
      />
      {subTasks?.length > 0 ? (
        <>
          <View style={styles.separator} />
          <Text
            style={styles.subTaskHeader}
            color={'grey'}
            localeKey={'taskDetails.subTask'}
          />
        </>
      ) : null}
      <FlatList
        showsVerticalScrollIndicator={false}
        ListFooterComponent={footer()}
        ItemSeparatorComponent={<View style={styles.flatListSeparator} />}
        data={subTasks || []}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              <SubTask
                text={item?.title}
                done={item?.status}
                deleteButtonPress={!status ? () => deleteTask(index) : null}
              />
            </View>
          );
        }}
      />
      <View style={styles.footerView} />

      <ActionsSheet
        visible={openMainForm}
        onClose={() => {
          setOpenMainForm(false);
        }}>
        <Form
          renderFooter={
            isCalendarAvail ? (
              <OneLineToggle
                disabled={calendarId}
                style={styles.toggle}
                value={calendar}
                leftText={'common.setTaskInCalendar'}
                onValueChange={v => {
                  setCalendar(v);
                }}
              />
            ) : null
          }
          initialValues={getInitialValues(formData)}
          fields={getFormFields(setIsCalendarAvail)}
          validationSchema={validation}
          onSubmit={values => {
            setTaskToCalendar({
              values,
              calendar,
              mainTask: formData,
              onSubmit,
            });
          }}
        />
      </ActionsSheet>
    </Container>
  );
};

export default TaskDetailsScreen;
