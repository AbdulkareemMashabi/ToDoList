import {Image, View} from 'react-native';
import Text from '../Text/Text';
import styles from './DoubleText.style';
import Button from '../Button/Button';
import {Icons} from '../../assets/Icons';

export const DoubleText = ({
  title,
  description,
  date,
  editButtonPress,
  deleteButtonPress,
  done,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imageTextView}>
          {done ? <Image source={Icons.check} style={styles.image} /> : null}
          <Text value={title} />
        </View>
        <Text
          value={description}
          variant="bodyRegular"
          style={styles.description}
        />
      </View>
      <View style={styles.container}>
        <Text value={date} variant="bodyRegular" color={'grey'} />
        <View>
          <View
            style={[
              styles.buttonContainer,
              !editButtonPress ? styles.buttonContainerOneElement : null,
            ]}>
            {editButtonPress ? (
              <Button source={Icons.edit} onPress={editButtonPress} />
            ) : null}
            {deleteButtonPress ? (
              <Button source={Icons.delete} onPress={deleteButtonPress} />
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default DoubleText;
