import {Image, View} from 'react-native';
import Text from '../Text/Text';
import Button from '../Button/Button';

import styles from './SubTask.style';
import {Icons} from '../../assets/Icons';

export const SubTask = ({style, text, deleteButtonPress, done}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        {done ? <Image source={Icons.check} style={styles.image} /> : null}
        <Text value={text} />
      </View>
      {deleteButtonPress ? (
        <Button source={Icons.delete} onPress={deleteButtonPress} />
      ) : null}
    </View>
  );
};

export default SubTask;
