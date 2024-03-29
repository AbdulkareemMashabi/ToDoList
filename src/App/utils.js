import {setIsLoading, setUserData} from '../helpers/Redux/mainReducer';
import {getAllDocuments} from '../helpers/firebase';
import {handleAPIErrors} from '../helpers/utils';

export const getUserData = async (userId, dispatch) => {
  if (userId)
    try {
      dispatch(setIsLoading(true));
      const documents = await getAllDocuments(userId);
      const reShapeDocuments = [];
      documents.forEach(doc => {
        reShapeDocuments.push({id: doc.id, data: doc.data()});
      });
      dispatch(setUserData(reShapeDocuments));
    } catch (e) {
      handleAPIErrors(e);
    } finally {
      dispatch(setIsLoading(false));
    }
};

export const getRandomNumber = usedNumbers => {
  let randomNumber = Math.floor(Math.random() * 4);
  if (usedNumbers.current.length === 4) {
    usedNumbers.current = [];
  }
  while (usedNumbers.current.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * 4);
  }
  usedNumbers.current.push(randomNumber);

  return randomNumber;
};
