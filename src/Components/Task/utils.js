import {setIsLoadingOverLay} from '../../helpers/Redux/mainReducer';
import {updateDocuments} from '../../helpers/firebase';
import {backgroundColors, handleAPIErrors, isNil} from '../../helpers/utils';
import {getShadow} from '../../helpers/shadow';
import moment from 'moment';

export const getBackgroundColor = (date, status) => {
  if (!date) {
    if (!status)
      return {
        backgroundColor: backgroundColors.orange,
        ...getShadow('orange'),
      };
    else
      return {
        backgroundColor: backgroundColors.green,
        ...getShadow('green'),
      };
  }

  const days = getDateDifference(date);
  if (days >= 0 && !status) {
    return {
      backgroundColor: backgroundColors.orange,
      ...getShadow('orange'),
    };
  } else if (days < 0 && !status) {
    return {
      backgroundColor: backgroundColors.red,
      ...getShadow('red'),
    };
  } else {
    return {
      backgroundColor: backgroundColors.green,
      ...getShadow('green'),
    };
  }
};

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
}) => {
  try {
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

    dispatch(setIsLoadingOverLay(true));
    await updateDocuments(userId, documentId, finalValues);
    setTasks({mainTask, subTasks, ...finalValues});
    dispatch(setIsLoadingOverLay(false));
  } catch (e) {
    handleAPIErrors(e);
    dispatch(setIsLoadingOverLay(false));
  }
};

export const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
