import reactotron from 'reactotron-react-native';
import {isNil} from '../../helpers/utils';

export const getInitialValues = (formData, selectedIndex) => {
  if (formData?.subTasks?.length === selectedIndex) return null;
  const isSubTasks = !isNil(selectedIndex);

  return {
    title: isSubTasks
      ? formData?.subTasks[selectedIndex]?.title
      : formData?.mainTask?.title,
    description: isSubTasks
      ? formData?.subTasks[selectedIndex]?.description
      : formData?.mainTask?.description,
    date: isSubTasks
      ? formData?.subTasks[selectedIndex]?.date
      : formData?.mainTask?.date,
  };
};
