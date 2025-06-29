import {callAPI, readToken} from './utils';

export const getAllTasks = async () => {
  const token = await readToken();
  return await callAPI({
    url: 'http://10.0.2.2:8080/task/list',
    method: 'GET',
    headers: {Authorization: 'Bearer ' + token},
  });
};

export const createTask = async data => {
  const {title, date, description, calendarId, color} = data || {};
  const token = await readToken();

  return await callAPI({
    url: 'http://10.0.2.2:8080/task/create-task',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({title, date, description, calendarId, color}),
  });
};

export const updateTask = async data => {
  const {taskId, newValues} = data || {};
  const token = await readToken();

  return await callAPI({
    url: 'http://10.0.2.2:8080/task/update-task',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({taskId, newValues}),
  });
};

export const updateFavorite = async taskId => {
  const token = await readToken();

  return await callAPI({
    url: 'http://10.0.2.2:8080/task/update-favorite',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({taskId}),
  });
};

export const updateStatusService = async data => {
  const {taskId, newValues} = data || {};
  const token = await readToken();

  return await callAPI({
    url: 'http://10.0.2.2:8080/task/update-status',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({taskId, newValues}),
  });
};

export const deleteTaskService = async taskId => {
  const token = await readToken();

  return await callAPI({
    url: 'http://10.0.2.2:8080/task/delete-task',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({taskId}),
  });
};
