import {callAPI, readToken, storeToken} from './utils';
import CryptoJS from 'crypto-js';
import {PRIVATE_KEY} from '@env';
import {getUniqueId} from 'react-native-device-info';

export const signUp = async data => {
  const {email, password} = data || {};
  const securePassword = CryptoJS.AES.encrypt(password, PRIVATE_KEY).toString();

  return await callAPI({
    url: 'http://10.0.2.2:8080/auth/signUp',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password: securePassword}),
  });
};

export const login = async data => {
  const {email, password} = data || {};
  const securePassword = CryptoJS.AES.encrypt(password, PRIVATE_KEY).toString();

  const resultBody = await callAPI({
    url: 'http://10.0.2.2:8080/auth/login',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password: securePassword}),
  });

  const {token} = resultBody || {};
  return await storeToken(token);
};

export const signUpWithId = async () => {
  const deviceId = await getUniqueId();
  const secureDeviceId = CryptoJS.AES.encrypt(deviceId, PRIVATE_KEY).toString();

  const resultBody = await callAPI({
    url: 'http://10.0.2.2:8080/auth/signup-Id',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({deviceId: secureDeviceId}),
  });

  const {token} = resultBody || {};
  return await storeToken(token);
};

export const deleteAccount = async () => {
  const token = await readToken();

  await callAPI({
    url: 'http://10.0.2.2:8080/auth/delete-account',
    method: 'DELETE',
    headers: {Authorization: 'Bearer ' + token},
  });

  return await storeToken('');
};
