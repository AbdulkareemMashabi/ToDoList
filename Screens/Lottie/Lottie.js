import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {pagesNames} from '../../helpers/utils';

export const Lottie = ({navigation}) => {
  return (
    <View style={styles.takingAllPage}>
      <LottieView
        source={require('../../assets/Lottie/splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => navigation.replace(pagesNames.dashboard)}
        style={styles.takingAllPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  takingAllPage: {flex: 1},
});

export default Lottie;
