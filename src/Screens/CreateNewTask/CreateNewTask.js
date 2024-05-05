import {useEffect, useRef, useState} from 'react';
import Locale from '../../helpers/localization';
import Form from '../../Components/Form/Form';
import * as Yup from 'yup';
import {getShadow} from '../../helpers/shadow';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBackgroundColor,
  setIsLoading,
} from '../../helpers/Redux/mainReducer';
import {
  backgroundColors,
  handleAPIErrors,
  pagesNames,
} from '../../helpers/utils';
import {addUserData} from '../../helpers/firebase';
import Container from '../../Components/Contianer/Container';
import styles from './CreateNewTask.style';
import {View} from 'react-native';
import {CreateNewTaskImages} from '../../assets/CreateNewTaskImages';
import {getRandomNumber} from './utils';

export const CreateNewTask = ({navigation}) => {
  const {userId, backgroundColor} = useSelector(state => state.main);
  const [image, setImage] = useState(null);
  const usedNumbers = useRef([]);

  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: Locale.t('newTask.newTaskTitle'),
    });
    const keys = Object.keys(CreateNewTaskImages);
    const randomNumber = getRandomNumber(usedNumbers);
    const randomKey = keys[randomNumber];

    dispatch(setBackgroundColor(backgroundColors[randomKey]));
    setImage(CreateNewTaskImages[randomKey]);

    return () => {
      dispatch(setBackgroundColor(null));
    };
  }, []);

  const validation = Yup.object().shape({
    title: Yup.string().required(Locale.t('common.required')),
  });

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
            },
            {
              type: 'TextArea',
              name: 'description',
              label: 'newTask.description',
            },
          ]}
          onSubmit={async values => {
            try {
              dispatch(setIsLoading(true));
              const docId = await addUserData(userId, {
                ...values,
                color: backgroundColor,
              });
              dispatch(setIsLoading(false));
              navigation.replace(pagesNames.taskDetailsScreen, {
                documentId: docId,
              });
            } catch (e) {
              handleAPIErrors(e);
              dispatch(setIsLoading(false));
            }
          }}
        />
      </View>
    </Container>
  );
};

export default CreateNewTask;
