import {
  setIsLoadingOverLay,
  setEnableDoneLottie,
} from '../../helpers/Redux/mainReducer';
import {updateStatusService} from '../../helpers/taskServices';
import {
  backgroundColors,
  dispatch,
  handleAPIErrors,
  setSharedData,
} from '../../helpers/utils';
import moment from 'moment';
import Sound from 'react-native-sound';

export const getBorderColor = (date, status) => {
  if (!date) {
    if (!status)
      return {
        borderColor: backgroundColors.orange,
      };
    else
      return {
        borderColor: backgroundColors.green,
      };
  }

  const days = getDateDifference(date);
  if (days >= 0 && !status)
    return {
      borderColor: backgroundColors.orange,
    };
  else if (days < 0 && !status)
    return {
      borderColor: backgroundColors.red,
    };
  else
    return {
      borderColor: backgroundColors.green,
    };
};

export const getBorderColorSubTask = status => {
  if (!status)
    return {
      borderColor: backgroundColors.orange,
    };
  else
    return {
      borderColor: backgroundColors.green,
    };
};

export const getDateDifference = date => {
  const startDate = new Date(moment().format('YYYY-MM-DD'));
  const dataObject = date.split('/');
  const endDate = new Date(
    moment(`${dataObject[2]}-${dataObject[1]}-${dataObject[0]}`).format(
      'YYYY-MM-DD',
    ),
  );

  const differenceInMill = endDate - startDate;
  const differenceInDays = differenceInMill / (1000 * 60 * 60 * 24);

  return Math.floor(differenceInDays);
};

export const updateStatus = async ({
  setTask,
  favorite,
  navigation,
  task,
  index,
}) => {
  try {
    dispatch(setIsLoadingOverLay(true));
    const newTaskValues = {...task, subTasks: [...task.subTasks]};

    if (index?.toString()) {
      newTaskValues.subTasks[index] = {
        ...newTaskValues.subTasks[index],
        status: true,
      };
    } else {
      newTaskValues.status = true;
    }

    const {updatedTask} =
      (await updateStatusService(
        {taskId: task._id, newValues: newTaskValues},
        navigation,
      )) || {};

    if (favorite) {
      setSharedData(updatedTask);
    }

    setTask(updatedTask);

    playSoundAndLottie(updatedTask?.status);

    dispatch(setIsLoadingOverLay(false));
  } catch (e) {
    handleAPIErrors(e);
    dispatch(setIsLoadingOverLay(false));
  }
};

export const getRandomColor = () => {
  const colors = Object.values(backgroundColors);
  return colors[Math.floor(Math.random() * colors.length)];
};

const playSoundAndLottie = isMainTaskCompleted => {
  var sound = new Sound('correct_sound.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      return;
    }

    sound.play();
    if (isMainTaskCompleted) dispatch(setEnableDoneLottie(true));
  });
};
