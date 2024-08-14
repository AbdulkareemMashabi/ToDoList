import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1},
  button: {
    width: 56,
    height: 56,
    backgroundColor: '#32ADE6',
    borderRadius: 16,
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width / 4,
  },
  separator: {
    marginVertical: 8,
  },
  deleteButton: {
    backgroundColor: 'rgba(255,236,236,0.25)',
  },
  favoriteButton: {
    backgroundColor: 'rgba(234, 179, 8, 0.10)',
  },
  infoButton: {
    backgroundColor: 'rgba(50,173,230,0.05)',
  },
  buttonsTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex_1: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  flatList: {
    flexGrow: 1,
  },
  plusButton: {
    marginBottom: 64,
  },
});
