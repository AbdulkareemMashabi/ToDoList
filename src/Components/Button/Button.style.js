import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  imageSize: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  loading: {width: '100%', height: 30},
  text: {
    textAlign: 'center',
  },
  blueText: {color: '#32ADE6'},
  whiteText: {color: 'white'},
  container: {
    width: '100%',
    height: 48,
    backgroundColor: '#32ADE6',
    borderRadius: 16,
    justifyContent: 'center',
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  plusImage: {
    marginRight: 16,
  },
});
