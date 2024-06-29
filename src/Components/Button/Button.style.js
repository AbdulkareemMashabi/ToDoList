import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  imageSize: {
    alignSelf: 'center',
  },
  loading: {width: '100%', height: 30},
  text: {
    textAlign: 'center',
  },
  container: {
    width: '100%',
    height: 48,
    backgroundColor: '#32ADE6',
    borderRadius: 16,
    justifyContent: 'center',
  },
  plusImage: {
    marginRight: 16,
  },
  disabled: {
    backgroundColor: 'grey',
  },
  icon: {marginRight: 8},
  iconWithTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipRTL: {
    transform: [{scaleX: -1}],
  },
  doneLottie: {
    ...StyleSheet.absoluteFillObject,
    width: 40,
    height: 50,
  },
  buttonHeight: {
    height: 50,
  },
});
