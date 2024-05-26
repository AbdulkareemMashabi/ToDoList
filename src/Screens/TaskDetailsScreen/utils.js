export const getInitialValues = formData => {
  const {title, description, date} = formData?.mainTask || {};
  let getInitialValue = {
    title: title,
    description: description,
    date: date,
  };

  return getInitialValue;
};

export const getFormFields = setIsCalendarAvail => [
  {type: 'TextField', name: 'title', label: 'newTask.title'},
  {
    type: 'DatePicker',
    name: 'date',
    label: 'newTask.date',
    onValueChange: v => {
      setIsCalendarAvail(!!v);
    },
  },
  {
    type: 'TextArea',
    name: 'description',
    label: 'newTask.description',
  },
];
