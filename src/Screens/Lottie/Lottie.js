import LottieView from 'lottie-react-native';
import {pagesNames} from '../../helpers/utils';
import Container from '../../Components/Contianer/Container';
import styles from './Lottie.style';

export const Lottie = ({navigation}) => {
  return (
    <Container backgroundColor={'#e5e5e5'}>
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
