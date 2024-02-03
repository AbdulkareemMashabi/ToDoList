import LottieView from 'lottie-react-native';
import {pagesNames} from '../../helpers/utils';
import Container from '../../Components/Contianer/Container';
import styles from './Lottie.style';

export const Lottie = ({navigation}) => {
  return (
    <Container>
      <LottieView
        source={require('../../assets/Lottie/splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => navigation.replace(pagesNames.dashboard)}
        style={styles.lottie}
      />
    </Container>
  );
};

export default Lottie;
