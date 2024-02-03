import {View, Image} from 'react-native';
import Text from '../Text/Text';

import styles from './EmptyList.style';

export const EmptyList = ({image, title, description}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title} localeKey={title} />
      <Text style={styles.description} localeKey={description} color={'grey'} />
    </View>
  );
};

export default EmptyList;
