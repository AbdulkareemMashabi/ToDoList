import {StyleSheet} from 'react-native';
import {cardShadow} from '../../helpers/shadow';
import Locale from '../../helpers/localization';

export default StyleSheet.create({
  rootView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    ...cardShadow,
  },
  leftView: {
    alignItems: 'flex-start',
  },
  rightView: {
    alignItems: Locale.isRTL ? 'flex-start' : 'flex-end',
  },
  flipRTL: {
    transform: [{scaleX: -1}],
  },
  flex_1: {
    flex: 1,
  },
});
