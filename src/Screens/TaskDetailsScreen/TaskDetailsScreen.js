import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {handleAPIErrors, isNil} from '../../helpers/utils';
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

export const TaskDetailsScreen = ({navigation, route}) => {
  const {userId} = useSelector(state => state.main);
  const {documentId} = route.params;
  const [formData, setFormData] = useState(null);
  const [openMainForm, setOpenMainForm] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [initialLoading, setInitialLoading] = useState(false);
  const [newSubTask, setNewSubTask] = useState('');
  const [enableDoneButton, setEnableDonButton] = useState(false);
  const dispatch = useDispatch();

  const validation = Yup.object().shape({
    title: Yup.string().required(Locale.t('common.required')),
  });

  const getData = async () => {
    try {
      setInitialLoading(true);
      const document = await getSpecificDocument(userId, documentId);
      setFormData(document);
    } catch (e) {
      handleAPIErrors(e);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: formData?.mainTask?.title,
      headerRight: () => (
        <Button
          disabled={!enableDoneButton}
          source={'taskDetails.Done'}
          variant="secondary"
          containerStyle={styles.doneButton}
          onPress={async () => {
            try {
              dispatch(setIsLoadingOverLay(true));
              await updateDocuments(userId, documentId, formData);
              setEnableDonButton(false);
            } catch (e) {
              handleAPIErrors(e);
            } finally {
              dispatch(setIsLoadingOverLay(false));
            }
          }}
        />
      ),
    });
  }, [enableDoneButton, formData]);

  useEffect(() => {
    getData();
  }, []);

  const footer = () => {
    if (formData?.mainTask?.status) return null;
    return (
      <TextField
        withoutShadow
        style={styles.textField}
        label={'taskDetails.newSub'}
        onBlurField={() => {
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
        }}
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
                deleteButtonPress={() => {
                  let finalValues = {};
                  finalValues = {
                    subTasks: formData?.subTasks.slice(),
                  };
                  finalValues.subTasks.splice(index, 1);

                  setFormData({...formData, ...finalValues});
                  setEnableDonButton(true);
                }}
              />
            </View>
          );
        }}
      />

      <ActionsSheet
        visible={openMainForm}
        onClose={() => {
          setOpenMainForm(false);
          setSelectedIndex(null);
        }}>
        <Form
          initialValues={getInitialValues(formData, selectedIndex)}
          fields={getFormFields(selectedIndex)}
          validationSchema={validation}
          onSubmit={values => {
            let finalValues = {};
            if (!isNil(selectedIndex)) {
              finalValues = {subTasks: formData?.subTasks.slice()};
              finalValues.subTasks[selectedIndex] = {
                ...values,
                status: false,
              };
            } else {
              finalValues = {mainTask: {...values, status: false}};
            }
            setFormData({...formData, ...finalValues});
            setEnableDonButton(true);
            setOpenMainForm(false);
            setSelectedIndex(null);
          }}
        />
      </ActionsSheet>
    </Container>
  );
};

export default TaskDetailsScreen;
