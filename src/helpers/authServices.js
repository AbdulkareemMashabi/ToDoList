import {readToken, storeToken, validateAuthentication} from './utils';
import CryptoJS from 'crypto-js';
import {PRIVATE_KEY} from '@env';
import {getUniqueId} from 'react-native-device-info';

export const signUp = async (data, navigation) => {
  const {email, password} = data || {};
  const securePassword = CryptoJS.AES.encrypt(password, PRIVATE_KEY).toString();
  return await fetch('http://10.0.2.2:8080/auth/signUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password: securePassword,
    }),
  })
    .then(async res => {
      return await validateAuthentication({navigation, res});
    })
    .catch(error => {
      throw error;
    });
};

export const login = async (data, navigation) => {
  const {email, password} = data || {};
  const securePassword = CryptoJS.AES.encrypt(password, PRIVATE_KEY).toString();
  return await fetch('http://10.0.2.2:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password: securePassword,
    }),
  })
    .then(async res => {
      const resultBody = await validateAuthentication({navigation, res});
      const {token} = resultBody || {};
      return await storeToken(token);
    })
    .catch(error => {
      throw error;
    });
};

export const signUpWithId = async navigation => {
  const deviceId = await getUniqueId();
  const secureDeviceId = CryptoJS.AES.encrypt(deviceId, PRIVATE_KEY).toString();
  return await fetch('http://10.0.2.2:8080/auth/signup-Id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      deviceId: secureDeviceId,
    }),
  })
    .then(async res => {
      const resultBody = await validateAuthentication({navigation, res});
      const {token} = resultBody || {};
      return await storeToken(token);
    })
    .catch(error => {
      throw error;
    });
};

export const deleteAccount = async navigation => {
  const token = await readToken();
  return await fetch('http://10.0.2.2:8080/auth/delete-account', {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then(async res => {
      await validateAuthentication({navigation, res});
      return await storeToken('');
    })
    .catch(error => {
      throw error;
    });
};
