import {StyleSheet} from 'react-native';
import {cardShadow} from '../../helpers/shadow';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  noPadding: {
    padding: 0,
  },
  flex_1: {
    flex: 1,
  },
  greyColor: {backgroundColor: '#e5e5e5'},
  image: {backgroundColor: 'white'},
  takingAllPage: {width: '100%', flex: 1},
  lottieView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderFooter: {
    ...cardShadow,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 42,
    marginTop: 10,
  },
  renderContent: {
    paddingHorizontal: 16,
    flex: 1,
  },
});
