import {View} from 'react-native';
import styles from './Container.style';

export const Container = ({children, noPadding, style}) => {
  return (
    <View
      style={[styles.container, noPadding ? styles.noPadding : null, style]}>
      {children}
    </View>
  );
};

export default Container;
