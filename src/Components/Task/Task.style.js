import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flexDirection: 'row', padding: 6},
  leftBlock: {
    width: 20,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  taskSubTasksParent: {
    flex: 1,
    paddingHorizontal: 8,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 3,
    backgroundColor: 'white',
  },
  mainTaskParent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  mainTaskTitleDate: {
    marginLeft: 8,
    flex: 1,
  },
  subTaskParent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 16,
  },
  subTaskTitleParent: {
    marginLeft: 8,
    flex: 1,
  },
  mainTaskCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  subTaskCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#E6E9EF',
    marginVertical: 8,
  },
});
