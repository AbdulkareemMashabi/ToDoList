import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1},
  button: {
    width: 64,
    height: 64,
    backgroundColor: '#32ADE6',
    borderRadius: 16,
    justifyContent: 'center',
    margin: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 8,
  },
  viewContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  separator: {
    marginVertical: 8,
  },
  viewButton: {
    height: '15%',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
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
  skeleton: {
    paddingHorizontal: 16,
  },
  flatListHeader: {
    height: 16,
  },
});
