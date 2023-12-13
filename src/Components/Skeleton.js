import {FlatList, StyleSheet, View} from 'react-native';
import Shimmer from './Shimmer';
import {useSelector} from 'react-redux';

export const Skeleton = () => {
  const {isLoading} = useSelector(state => state.loading);
  return (
    <>
      {isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={() => <Shimmer />}
          ItemSeparatorComponent={<View style={styles.separator} />}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 16,
  },
});

export default Skeleton;
