import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1},
  button: {
    width: 64,
    height: 64,
    backgroundColor: '#32ADE6',
    borderRadius: 16,
    justifyContent: 'center',
    margin: 16,
    marginBottom: 64,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width / 4,
  },
  separator: {
    marginVertical: 4,
  },
  deleteButton: {
    backgroundColor: 'rgba(255,236,236,0.25)',
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
});
