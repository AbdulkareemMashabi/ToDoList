import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import styles from './Container.style';
import Skeleton from '../Skeleton/Skeleton';

export const Container = ({
  children,
  noPadding,
  style,
  scrollable,
  isLoading,
  SkeletonPadding,
}) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  if (isLoading)
    return (
      <View
        style={[
          styles.container,
          noPadding && !SkeletonPadding ? styles.noPadding : null,
          style,
        ]}>
        <Skeleton />
      </View>
    );

  const renderContent = () => {
    if (scrollable)
      return <ScrollView style={styles.flex_1}>{children}</ScrollView>;
    else return <View style={styles.flex_1}>{children}</View>;
  };

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      keyboardVerticalOffset={50}
      style={[styles.container, noPadding ? styles.noPadding : null, style]}>
      {renderContent()}
    </KeyboardAvoidingView>
  );
};

export default Container;
