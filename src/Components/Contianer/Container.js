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
import {LottieIndex} from '../../assets/Lottie';

export const Container = ({
  children,
  style,
  scrollable,
  backgroundImage,
  renderFooter,
  backgroundColor,
  lottie,
}) => {
  const {isLoadingSkeleton, isLoadingOverLay, enableDoneLottie, isLoading} =
    useSelector(state => state.main);
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    if (isLoadingSkeleton) return <Skeleton />;
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
                enableDoneLottie
                  ? LottieIndex.doneLottie
                  : lottie || LottieIndex.loadingOverLay
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
        pointerEvents={
          isLoading || isLoadingOverLay || isLoadingSkeleton ? 'none' : 'auto'
        }
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
