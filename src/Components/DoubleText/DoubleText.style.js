import {StyleSheet} from 'react-native';
import {backgroundColors} from '../../helpers/utils';
import {getShadow} from '../../helpers/shadow';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    marginTop: 16,
  },
  buttonContainer: {
    marginLeft: 16,
    justifyContent: 'space-between',
    flex: 1,
  },
  buttonContainerOneElement: {
    justifyContent: 'center',
  },
  image: {
    marginRight: 10,
  },
  imageTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
