import {useEffect, useState} from 'react';
import {FlatList, Platform, View} from 'react-native';
import {
  RESULT_PERMISSION,
  handleAPIErrors,
  setInCalendar,
  setSharedData,
  setTaskToCalendar,
} from '../../helpers/utils';
import {getSpecificDocument, updateDocuments} from '../../helpers/firebase';
import {useDispatch, useSelector} from 'react-redux';
import DoubleText from '../../Components/DoubleText/DoubleText';
import styles from './TaskDetailsScreen.style';
import ActionsSheet from '../../Components/ActionsSheet/ActionsSheet';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import Locale from '../../helpers/localization';
import {setIsLoadingOverLay} from '../../helpers/Redux/mainReducer';
import {getFormFields, getInitialValues} from './utils';
import Text from '../../Components/Text/Text';
import Container from '../../Components/Contianer/Container';
import SubTask from '../../Components/SubTask/SubTask';
import TextField from '../../Components/TextField/TextField';
import Button from '../../Components/Button/Button';
import {Icons} from '../../assets/Icons';
import OneLineToggle from '../../Components/OneLineToggle/OneLineToggle';
import RNCalendarEvents from 'react-native-calendar-events';

export const TaskDetailsScreen = ({navigation, route}) => {
  const {userId} = useSelector(state => state.main);
  const {documentId, refreshing} = route.params;
  const [formData, setFormData] = useState(null);
  const [openMainForm, setOpenMainForm] = useState(false);
  const [mainTaskSubmitted, setMainTaskSubmitted] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [newSubTask, setNewSubTask] = useState('');
  const [enableDoneButton, setEnableDonButton] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [isCalendarAvail, setIsCalendarAvail] = useState(false);
  const dispatch = useDispatch();

  const validation = Yup.object().shape({
    title: Yup.string().required(Locale.t('common.required')),
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: formData?.mainTask?.title,
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
          source={Platform.OS === 'ios' ? Icons.backButton : Icons.arrow}
          onPress={setCalendarFun}
        />
      ),
    });
  }, [enableDoneButton, formData, setCalendarFun, calendar, mainTaskSubmitted]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const document = await getSpecificDocument(userId, documentId);
      const {date, calendarId} = document?.mainTask || {};
      setIsCalendarAvail(date);
      setCalendar(calendarId);
      setFormData(document);
    } catch (e) {
      handleAPIErrors(e);
    } finally {
      setInitialLoading(false);
    }
  };

  const setCalendarFun = () => {
    if (calendar && enableDoneButton && mainTaskSubmitted) {
      setInCalendar(formData?.mainTask, submit);
    } else submit();
  };

  const submit = async (_, calendarId, showToast) => {
    if (enableDoneButton)
      try {
        const finalCalendarId = calendarId || calendar;
        dispatch(setIsLoadingOverLay(true));
        const newData = {
          ...formData,
          mainTask: {
            ...formData.mainTask,
            calendarId: finalCalendarId ? finalCalendarId : null,
          },
        };
        await updateDocuments(userId, documentId, newData);
        if (calendarId) showToast?.();
        if (formData.favorite) {
          setSharedData(newData);
        }
        dispatch(setIsLoadingOverLay(false));
        navigation.goBack();
        refreshing();
      } catch (e) {
        handleAPIErrors(e);
        dispatch(setIsLoadingOverLay(false));
      }
    else {
      refreshing();
      navigation.goBack();
    }
  };

  const textFieldBlur = () => {
    if (newSubTask) {
      let finalValues = {};
      finalValues = {subTasks: formData?.subTasks.slice()};
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
      subTasks: formData?.subTasks.slice(),
    };
    finalValues.subTasks.splice(index, 1);

    setFormData({...formData, ...finalValues});
    setEnableDonButton(true);
  };

  const onSubmit = async values => {
    const finalValues = {
      mainTask: {
        ...formData.mainTask,
        ...values,
        status: false,
      },
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
    if (formData?.mainTask?.status) return null;
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
    <Container isLoading={initialLoading}>
      <DoubleText
        done={formData?.mainTask?.status}
        title={formData?.mainTask?.title}
        description={formData?.mainTask?.description}
        date={formData?.mainTask?.date}
        editButtonPress={
          !formData?.mainTask?.status
            ? () => {
                setOpenMainForm(true);
              }
            : null
        }
      />
      {formData?.subTasks?.length > 0 ? (
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
        data={formData?.subTasks || []}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              <SubTask
                text={item?.title}
                done={item?.status}
                deleteButtonPress={
                  !formData?.mainTask?.status ? () => deleteTask(index) : null
                }
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
                disabled={formData?.mainTask?.calendarId}
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
              mainTask: formData?.mainTask,
              onSubmit,
            });
          }}
        />
      </ActionsSheet>
    </Container>
  );
};

export default TaskDetailsScreen;
