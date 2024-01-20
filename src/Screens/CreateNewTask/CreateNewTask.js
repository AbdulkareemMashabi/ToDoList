import {useEffect} from 'react';
import Locale from '../../helpers/localization';
import {StyleSheet, View} from 'react-native';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import {getShadow} from '../../helpers/shadow';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLoading} from '../../helpers/Redux/mainReducer';
import {handleAPIErrors, pagesNames} from '../../helpers/utils';
import {addUserData} from '../../helpers/firebase';

export const CreateNewTask = ({navigation}) => {
  const {userId, backgroundColor} = useSelector(state => state.main);
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: Locale.t('newTask.newTaskTitle'),
    });
  }, []);

  const validation = Yup.object().shape({
    title: Yup.string().required(Locale.t('common.required')),
  });

  return (
    <View style={[styles.container, getShadow(backgroundColor)]}>
      <Form
        validationSchema={validation}
        fields={[
          {type: 'TextField', name: 'title', label: 'newTask.title'},
          {type: 'DatePicker', name: 'date', label: 'newTask.date'},
          {
            type: 'TextArea',
            name: 'description',
            label: 'newTask.description',
          },
        ]}
        onSubmit={async values => {
          try {
            dispatch(setIsLoading(true));
            const docId = await addUserData(userId, values);
            navigation.replace(pagesNames.taskDetailsScreen, {
              documentId: docId,
            });
          } catch (e) {
            handleAPIErrors(e);
          } finally {
            dispatch(setIsLoading(false));
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
  },
});

export default CreateNewTask;