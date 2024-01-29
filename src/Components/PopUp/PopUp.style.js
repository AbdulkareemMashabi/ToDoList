import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  spaceBetweenItems: {
    marginVertical: 8,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
  },
  redButton: {
    backgroundColor: 'red',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
});
