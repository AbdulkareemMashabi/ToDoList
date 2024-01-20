import {useEffect, useState} from 'react';
import {FlatList, Keyboard, View} from 'react-native';
import {handleAPIErrors, isNil} from '../../helpers/utils';
import {getSpecificDocument, updateDocuments} from '../../helpers/firebase';
import {useDispatch, useSelector} from 'react-redux';
import DoubleText from '../../Components/DoubleText/DoubleText';
import styles from './TaskDetailsScreen.style';
import ActionsSheet from '../../Components/ActionsSheet/ActionsSheet';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import Locale from '../../helpers/localization';
import {ScrollView} from 'react-native-virtualized-view';
import {
  setIsLoading,
  setIsLoadingOverLay,
} from '../../helpers/Redux/mainReducer';
import Skeleton from '../../Components/Skeleton/Skeleton';
import Button from '../../Components/Button/Button';
import {getInitialValues} from './utils';
import Text from '../../Components/Text/Text';

export const TaskDetailsScreen = ({navigation, route}) => {
  const {userId} = useSelector(state => state.main);
  const {documentId} = route.params;
  const [formData, setFormData] = useState(null);
  const [openMainForm, setOpenMainForm] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [initialLoading, setInitialLoading] = useState(false);
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
    });
  }, [formData?.mainTask?.title]);

  useEffect(() => {
    getData();
  }, []);

  const footer = () => (
    <Button
      variant="addButton"
      containerStyle={styles.addNewTask}
      onPress={() => {
        setSelectedIndex(formData?.subTasks?.length);
        setOpenMainForm(true);
      }}
    />
  );

  return !initialLoading ? (
    <View style={styles.container}>
      <DoubleText
        title={formData?.mainTask?.title}
        description={formData?.mainTask?.description}
        date={formData?.mainTask?.date}
        editButtonPress={() => {
          setOpenMainForm(true);
        }}
      />
      {formData?.subTasks?.length > 0 ? (
        <>
          <View style={styles.separator} />
          <Text
            style={styles.subTaskHeader}
            isGrey
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
            <DoubleText
              title={item?.title}
              description={item?.description}
              date={item?.date}
              editButtonPress={() => {
                setSelectedIndex(index);
                setOpenMainForm(true);
              }}
              deleteButtonPress={async () => {
                try {
                  let finalValues = {};
                  finalValues = {
                    subTasks: formData?.subTasks,
                  };
                  finalValues.subTasks.splice(index, 1);

                  dispatch(setIsLoadingOverLay(true));
                  await updateDocuments(userId, documentId, finalValues);
                  setFormData({...formData, ...finalValues});
                } catch (e) {
                  handleAPIErrors(e);
                } finally {
                  dispatch(setIsLoadingOverLay(false));
                }
              }}
            />
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
          fields={[
            {type: 'TextField', name: 'title', label: 'newTask.title'},
            {type: 'DatePicker', name: 'date', label: 'newTask.date'},
            {
              type: 'TextArea',
              name: 'description',
              label: 'newTask.description',
            },
          ]}
          validationSchema={validation}
          onSubmit={async values => {
            try {
              let finalValues = {};
              if (!isNil(selectedIndex)) {
                finalValues = {subTasks: formData?.subTasks};
                finalValues.subTasks[selectedIndex] = {
                  ...values,
                  status: false,
                };
              } else {
                finalValues = {mainTask: {...values, status: false}};
              }

              dispatch(setIsLoading(true));
              await updateDocuments(userId, documentId, finalValues);
              setFormData({...formData, ...finalValues});
              setOpenMainForm(false);
              setSelectedIndex(null);
            } catch (e) {
              handleAPIErrors(e);
            } finally {
              dispatch(setIsLoading(false));
            }
          }}
        />
      </ActionsSheet>
    </View>
  ) : (
    <Skeleton />
  );
};

export default TaskDetailsScreen;
