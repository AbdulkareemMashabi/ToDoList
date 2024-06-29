import {
  setIsLoadingOverLay,
  setEnableDoneLottie,
} from '../../helpers/Redux/mainReducer';
import {store} from '../../helpers/Redux/store';
import {updateDocuments} from '../../helpers/firebase';
import {
  backgroundColors,
  dispatch,
  handleAPIErrors,
  isNil,
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
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const dataObject = date.split('/');
  const endDate = new Date(
    moment(`${dataObject[2]}-${dataObject[1]}-${dataObject[0]}`).format(
      'YYYY-MM-DD',
    ),
  );
  return endDate - startDate;
};

export const updateStatus = async ({
  mainTask,
  selectedIndex,
  subTasks,
  documentId,
  color,
  setTasks,
}) => {
  try {
    dispatch(setIsLoadingOverLay(true));
    const {userId} = store.getState().main;
    let finalValues = {};

    //set selected subTask to be done
    if (!isNil(selectedIndex)) {
      let newSubTasks = subTasks.slice();
      newSubTasks[selectedIndex] = {
        ...newSubTasks[selectedIndex],
        status: true,
      };
      finalValues = {
        subTasks: newSubTasks,
      };
      // search if all subTasks are done
      const allSubTasksDone = finalValues?.subTasks.find(item => !item.status);

      if (!allSubTasksDone) finalValues.mainTask = {...mainTask, status: true}; //set main task to be done if all subTasks are done
    } else {
      finalValues = {
        mainTask: {...mainTask, status: true}, // set mainTask to be done
      };
      if (subTasks.length)
        finalValues.subTasks = subTasks.map(item => ({...item, status: true})); // set subTasks to be done, because mainTask is done
    }

    // save color of whole task
    if (!mainTask?.color)
      finalValues.mainTask = {
        ...(finalValues?.mainTask || mainTask),
        color: color,
      };

    await updateDocuments(userId, documentId, finalValues);
    playSoundAndLottie(finalValues.mainTask?.status);

    setTasks({mainTask, subTasks, ...finalValues}); // update locally
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
