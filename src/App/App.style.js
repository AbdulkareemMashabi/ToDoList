import {StyleSheet} from 'react-native';
import {getShadow} from '../helpers/shadow';

export default StyleSheet.create({
  safeAreaView: {flex: 1, backgroundColor: 'white'},
  headerTitle: {fontSize: 17, fontWeight: 600},
  gestureStyle: {
    flex: 1,
  },
  pageStyle: {
    backgroundColor: 'transparent',
  },
  greyColor: {backgroundColor: '#e5e5e5'},
  image: {flex: 1},
  takingAllPage: {width: '100%', height: 80},
  lottieView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
