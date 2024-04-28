import {isNil} from '../../helpers/utils';

export const getInitialValues = (formData, selectedIndex) => {
  if (formData?.subTasks?.length === selectedIndex) return null;
  const isSubTasks = !isNil(selectedIndex);
  let getInitialValue = {
    title: isSubTasks
      ? formData?.subTasks[selectedIndex]?.title
      : formData?.mainTask?.title,
  };

  if (!isSubTasks) {
    getInitialValue = {
      ...getInitialValue,
      description: formData?.mainTask?.description,
      date: formData?.mainTask?.date,
    };
  }

  return getInitialValue;
};

export const getFormFields = () => {
  const formFields = [
    {type: 'TextField', name: 'title', label: 'newTask.title'},
  ];
  formFields.push({
    type: 'DatePicker',
    name: 'date',
    label: 'newTask.date',
  });
  formFields.push({
    type: 'TextArea',
    name: 'description',
    label: 'newTask.description',
  });

  return formFields;
};
