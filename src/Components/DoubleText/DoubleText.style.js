import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    marginTop: 16,
  },
  image: {
    marginRight: 10,
  },
  imageTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    alignSelf: 'center',
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1.1,
    marginLeft: 16,
  },
  subContainerWithNoDate: {
    alignItems: 'flex-end',
  },
  oneItem: {
    justifyContent: 'center',
  },
  imageAndText: {
    flex: 2,
  },
  flex_0: {
    flex: 0,
  },
  flex_1: {
    flex: 1,
  },
  editButton: {
    marginTop: 16,
  },
});
