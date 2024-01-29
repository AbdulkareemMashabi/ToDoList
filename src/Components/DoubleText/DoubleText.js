import {View} from 'react-native';
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
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text value={title} />
        <Text
          value={description}
          variant="bodyRegular"
          style={styles.description}
        />
      </View>
      <View style={styles.container}>
        <Text value={date} variant="bodyRegular" color={'grey'} />
        <View style={styles.buttonContainer}>
          {editButtonPress ? (
            <Button source={Icons.edit} onPress={editButtonPress} />
          ) : null}
          {deleteButtonPress ? (
            <Button
              source={Icons.delete}
              containerStyle={styles.button}
              onPress={deleteButtonPress}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default DoubleText;
