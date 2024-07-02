import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './Container.style';
import Skeleton from '../Skeleton/Skeleton';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import {Images} from '../../assets/Images';
import Button from '../Button/Button';
import {dispatch} from '../../helpers/utils';
import {setEnableDoneLottie} from '../../helpers/Redux/mainReducer';

export const Container = ({
  children,
  style,
  scrollable,
  isLoading: _isLoading,
  backgroundImage,
  renderFooter,
  backgroundColor,
}) => {
  const {isLoading, isLoadingOverLay, enableDoneLottie} = useSelector(
    state => state.main,
  );
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
  const insets = useSafeAreaInsets();
  const loadingLottiePath = '../../assets/Lottie/loadingOverLay.json';
  const doneLottiePath = '../../assets/Lottie/doneLottie.json';

  const renderContent = () => {
    if (_isLoading) return <Skeleton />;
    else if (scrollable)
      return <ScrollView style={styles.renderContent}>{children}</ScrollView>;
    else return <View style={styles.renderContent}>{children}</View>;
  };

  const renderFooterContent = () => {
    return (
      <View style={styles.renderFooter}>
        <Button {...renderFooter} />
      </View>
    );
  };

  const lottieAnimation = () => {
    return (
      <>
        {isLoadingOverLay || enableDoneLottie ? (
          <View
            style={isLoadingOverLay ? styles.lottieView : styles.doneLottie}>
            <LottieView
              speed={isLoadingOverLay ? 1 : 2}
              source={
                isLoadingOverLay
                  ? require(loadingLottiePath)
                  : require(doneLottiePath)
              }
              autoPlay
              loop={!enableDoneLottie}
              onAnimationFinish={() => {
                if (enableDoneLottie) dispatch(setEnableDoneLottie(false));
              }}
              style={styles.takingAllPage}
            />
          </View>
        ) : null}
      </>
    );
  };

  return (
    <ImageBackground
      style={[styles.flex_1, styles.image]}
      source={backgroundImage || Images.light}>
      <SafeAreaView
        edges={['top', 'left', 'right']}
        pointerEvents={isLoading || isLoadingOverLay ? 'none' : 'auto'}
        style={[
          styles.flex_1,
          {
            paddingTop: Platform.OS === 'ios' ? insets.top : 50,
            backgroundColor: backgroundColor,
          },
        ]}
        onStartShouldSetResponder={() => {
          Keyboard.dismiss();
        }}>
        <GestureHandlerRootView style={styles.flex_1}>
          <KeyboardAvoidingView
            behavior={behavior}
            keyboardVerticalOffset={50}
            style={[styles.container, style]}>
            {renderContent()}
          </KeyboardAvoidingView>
          {renderFooter && renderFooterContent()}
          {lottieAnimation()}
        </GestureHandlerRootView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Container;
