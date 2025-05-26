import {readToken, validateAuthentication} from './utils';

export const getAllTasks = async navigation => {
  const token = await readToken();
  return await fetch('http://10.0.2.2:8080/task/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
