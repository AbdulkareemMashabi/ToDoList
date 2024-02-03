import {FlatList, StyleSheet, View} from 'react-native';
import Shimmer from './Shimmer';

export const Skeleton = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      renderItem={({index}) => <Shimmer key={index} />}
      ItemSeparatorComponent={<View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 16,
  },
});

export default Skeleton;
