import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  safeAreaView: {flex: 1},
  headerTitle: {fontSize: 17, fontWeight: 600},
  gestureStyle: {
    flex: 1,
  },
  pageStyle: {
    backgroundColor: 'transparent',
  },
  greyColor: {backgroundColor: '#e5e5e5'},
  image: {flex: 1, backgroundColor: 'white'},
  takingAllPage: {width: '100%', flex: 1},
  lottieView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
