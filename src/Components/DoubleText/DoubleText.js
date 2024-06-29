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
  done,
}) => {
  const leftSideRender = () => (
    <>
      <View style={styles.imageTextView}>
        {done ? <Image source={Icons.check} style={styles.image} /> : null}
        <Text value={title} numberOfLines={1} ellipsizeMode={'tail'} />
      </View>
      <Text
        value={description}
        variant="bodyRegular"
        style={styles.description}
      />
    </>
  );

  const rightSideRender = () => (
    <>
      <Text
        value={date}
        variant="bodyRegular"
        color={'grey'}
        style={styles.date}
      />
      {editButtonPress ? (
        <Button
          source={Icons.edit}
          onPress={editButtonPress}
          containerStyle={date ? styles.editButton : null}
        />
      ) : null}
    </>
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.imageAndText,
          !date && !editButtonPress ? styles.flex_1 : null,
        ]}>
        {leftSideRender()}
      </View>
      <View
        style={[
          styles.subContainer,
          !date ? styles.subContainerWithNoDate : null,
          (!editButtonPress || !date) && description ? styles.oneItem : null,
          !description ? styles.oneItem : null,
          !date && !editButtonPress ? styles.flex_0 : null,
        ]}>
        {rightSideRender()}
      </View>
    </View>
  );
};

export default DoubleText;
