import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Reactotron from 'reactotron-react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Lottie from './Screens/Lottie/Lottie';
import {SafeAreaView, StyleSheet, NativeModules} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Dashboard from './Screens/Dashboard/Dashboard';
import Locale from './helpers/localization';
import Login from './Screens/Login/Login';
import {Icons} from './assets/Icons';

const Stack = createStackNavigator();

export const App = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <GestureHandlerRootView style={styles.gestureStyle}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Lottie"
            screenOptions={{
              headerStyle: styles.headerPageTitle,
              headerTitleAlign: 'center',
              cardStyle: styles.pageStyle,
            }}>
            <Stack.Screen
              name="Lottie"
              component={Lottie}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                headerTitle: Locale.t('myWishesPage.myWishes'),
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: Locale.t('backupPage.backupTitle'),
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1},
  headerPageTitle: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: {fontSize: 17, fontWeight: 600},
  gestureStyle: {
    flex: 1,
  },
  pageStyle: {paddingHorizontal: 16, paddingBottom: 16},
});

export default App;
