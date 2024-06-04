import {FlatList, View} from 'react-native';
import Shimmer from './Shimmer';

import styles from './Skeleton.style';

export const Skeleton = () => {
  return (
    <FlatList
      contentContainerStyle={styles.padding_16}
      data={[1, 2, 3, 4, 5]}
      renderItem={({index}) => <Shimmer key={index} />}
      ItemSeparatorComponent={<View style={styles.separator} />}
    />
  );
};

export default Skeleton;
