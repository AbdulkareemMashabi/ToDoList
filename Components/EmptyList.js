import {View, StyleSheet, Image} from 'react-native';
import Text from './Text';

export const EmptyList = ({image, title, description}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title} localeKey={title} />
      <Text style={styles.description} localeKey={description} isGrey />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 16,
    color: 'black',
  },
  description: {
    fontSize: 17,
    fontWeight: '600',
  },
  image: {
    width: 267.66,
    height: 268.61,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EmptyList;
