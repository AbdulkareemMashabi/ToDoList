import {Platform} from 'react-native';
import {PERMISSIONS, check, request} from 'react-native-permissions';
import {store} from '../../helpers/Redux/store';
import {
  resetCreateNewTaskBackgrounds,
  setBackgroundColor,
  setCreateNewTaskBackgrounds,
} from '../../helpers/Redux/mainReducer';
import {backgroundColors, dispatch} from '../../helpers/utils';
import {CreateNewTaskImages} from '../../assets/CreateNewTaskImages';

export const setImageBackground = setImage => {
  const keys = Object.keys(CreateNewTaskImages);

  const {createNewTaskBackgrounds} = store.getState().main;

  let randomNumber = Math.floor(Math.random() * 4);

  while (createNewTaskBackgrounds.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * 4);
  }

  dispatch(setCreateNewTaskBackgrounds(randomNumber));

  const randomKey = keys[randomNumber];

  setImage(CreateNewTaskImages[randomKey]);
  dispatch(setBackgroundColor(backgroundColors[randomKey]));
};
