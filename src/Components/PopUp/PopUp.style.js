import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  spaceBetweenItems: {
    marginVertical: 8,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    position: 'absolute',
    left: 0,
    right: 0,
    top: Dimensions.get('window').height / 4,
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
