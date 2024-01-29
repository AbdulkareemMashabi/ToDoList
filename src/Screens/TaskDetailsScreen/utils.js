import reactotron from 'reactotron-react-native';
import {isNil} from '../../helpers/utils';
import moment from 'moment';

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

export const getFormFields = (formData, selectedIndex) => {
  const formFields = [
    {type: 'TextField', name: 'title', label: 'newTask.title'},
  ];
  if (formData?.subTasks?.length === selectedIndex) {
    const dataObject = formData?.mainTask?.date?.split('/');
    const finalDataObject = new Date(
      moment(`${dataObject[2]}-${dataObject[1]}-${dataObject[0]}`).format(
        'YYYY-MM-DD',
      ),
    );
    formFields.push({
      type: 'DatePicker',
      name: 'date',
      label: 'newTask.date',
      maximumDate: finalDataObject,
    });
  }
  formFields.push({
    type: 'TextArea',
    name: 'description',
    label: 'newTask.description',
  });

  return formFields;
};
