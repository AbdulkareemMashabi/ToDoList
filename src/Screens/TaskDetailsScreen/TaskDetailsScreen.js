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
import {
  setIsLoading,
  setIsLoadingOverLay,
} from '../../helpers/Redux/mainReducer';
import Skeleton from '../../Components/Skeleton/Skeleton';
import Button from '../../Components/Button/Button';
import {getFormFields, getInitialValues} from './utils';
import Text from '../../Components/Text/Text';
import Container from '../../Components/Contianer/Container';

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
    date: Yup.string().required(Locale.t('common.required')),
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
    <Container>
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
                      subTasks: formData?.subTasks.slice(),
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
          fields={getFormFields(formData, selectedIndex)}
          validationSchema={validation}
          onSubmit={async values => {
            try {
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
    </Container>
  ) : (
    <Skeleton />
  );
};

export default TaskDetailsScreen;
