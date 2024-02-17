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
  button: {
    marginTop: 16,
  },
  buttonContainer: {
    marginLeft: 16,
  },
  doneStyle: {
    backgroundColor: backgroundColors.green,
    padding: 5,
    borderRadius: 16,
    ...getShadow('green'),
  },
});
