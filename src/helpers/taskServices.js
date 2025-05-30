import {readToken, validateAuthentication} from './utils';

export const getAllTasks = async navigation => {
  const token = await readToken();
  return await fetch('http://10.0.2.2:8080/task/list', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then(async res => {
      return await validateAuthentication({navigation, res});
    })
    .catch(error => {
      throw error;
    });
};

export const createTask = async (data, navigation) => {
  const {title, date, description, calendarId, color} = data || {};
  const token = await readToken();
  return await fetch('http://10.0.2.2:8080/task/create-task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      title,
      date,
      description,
      calendarId,
      color,
    }),
  })
    .then(async res => {
      return await validateAuthentication({navigation, res});
    })
    .catch(error => {
      throw error;
    });
};

export const updateTask = async (data, navigation) => {
  const {taskId, newValues} = data || {};
  const token = await readToken();
  return await fetch('http://10.0.2.2:8080/task/update-task', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      taskId,
      newValues,
    }),
  })
    .then(async res => {
      return await validateAuthentication({navigation, res});
    })
    .catch(error => {
      throw error;
    });
};

export const updateFavorite = async (taskId, navigation) => {
  const token = await readToken();
  return await fetch('http://10.0.2.2:8080/task/update-favorite', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      taskId,
    }),
  })
    .then(async res => {
      return await validateAuthentication({navigation, res});
    })
    .catch(error => {
      throw error;
    });
};

export const updateStatusService = async (data, navigation) => {
  const {taskId, newValues} = data || {};
  const token = await readToken();
  return await fetch('http://10.0.2.2:8080/task/update-status', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      taskId,
      newValues,
    }),
  })
    .then(async res => {
      return await validateAuthentication({navigation, res});
    })
    .catch(error => {
      throw error;
    });
};

export const deleteTaskService = async (taskId, navigation) => {
  const token = await readToken();
  return await fetch('http://10.0.2.2:8080/task/delete-task', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      taskId,
    }),
  })
    .then(async res => {
      return await validateAuthentication({navigation, res});
    })
    .catch(error => {
      throw error;
    });
};
