import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './Container.style';
import Skeleton from '../Skeleton/Skeleton';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import {toastConfig} from '../../helpers/utils';
import {useSelector} from 'react-redux';
import {Images} from '../../assets/Images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from '../Button/Button';

export const Container = ({
  children,
  noPadding,
  style,
  scrollable,
  isLoading: _isLoading,
  backgroundImage,
  renderFooter,
  backgroundColor,
}) => {
  const {isLoading, isLoadingOverLay} = useSelector(state => state.main);
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    if (_isLoading) return <Skeleton padding={noPadding} />;
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

  return (
    <ImageBackground
      style={[styles.flex_1, styles.image]}
      source={backgroundImage || Images.light}>
      <SafeAreaView
        edges={['top', 'left', 'right']}
        pointerEvents={isLoading || isLoadingOverLay ? 'none' : 'auto'}
        style={[
          styles.flex_1,
          {paddingTop: insets.top, backgroundColor: backgroundColor},
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
            {renderFooter && renderFooterContent()}
          </KeyboardAvoidingView>
        </GestureHandlerRootView>
        <Toast config={toastConfig} />
        {isLoadingOverLay ? (
          <View style={styles.lottieView}>
            <LottieView
              source={require('../../assets/Lottie/loadingOverLay.json')}
              autoPlay
              loop
              style={styles.takingAllPage}
            />
          </View>
        ) : null}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Container;
