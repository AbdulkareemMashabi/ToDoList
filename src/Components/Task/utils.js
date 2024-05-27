import {setIsLoadingOverLay} from '../../helpers/Redux/mainReducer';
import {updateDocuments} from '../../helpers/firebase';
import {backgroundColors, handleAPIErrors, isNil} from '../../helpers/utils';
import moment from 'moment';

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
  dispatch,
  subTasks,
  documentId,
  userId,
  setTasks,
  color,
}) => {
  try {
    dispatch(setIsLoadingOverLay(true));
    let finalValues = {};
    if (!isNil(selectedIndex)) {
      let newSubTasks = subTasks.slice();
      newSubTasks[selectedIndex] = {
        ...newSubTasks[selectedIndex],
        status: true,
      };
      finalValues = {
        subTasks: newSubTasks,
      };
      let allSubTasksDone = true;
      for (let i = 0; i < finalValues.subTasks.length; i++) {
        if (!finalValues.subTasks[i].status) {
          allSubTasksDone = false;
          break;
        }
      }
      if (allSubTasksDone) finalValues.mainTask = {...mainTask, status: true};
    } else {
      finalValues = {
        mainTask: {...mainTask, status: true},
      };
      if (subTasks)
        finalValues.setTasks = subTasks.map(item => ({...item, status: true}));
    }

    if (!mainTask?.color)
      finalValues.mainTask = {
        ...(finalValues?.mainTask || mainTask),
        color: color,
      };

    const body = {mainTask, subTasks, ...finalValues};

    await updateDocuments(userId, documentId, finalValues);
    setTasks(body);
  } catch (e) {
    handleAPIErrors(e);
    dispatch(setIsLoadingOverLay(false));
  } finally {
    dispatch(setIsLoadingOverLay(false));
  }
};

export const getRandomColor = () => {
  const colors = Object.values(backgroundColors);
  return colors[Math.floor(Math.random() * colors.length)];
};
