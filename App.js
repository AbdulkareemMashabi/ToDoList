import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Reactotron from 'reactotron-react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Lottie from './Screens/Lottie/Lottie';
import {SafeAreaView, StyleSheet, Keyboard} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Dashboard from './Screens/Dashboard/Dashboard';
import Login from './Screens/Login/Login';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

export const App = () => {
  const {page} = useSelector(state => state.paging) || {};

  return (
    <SafeAreaView
      style={[styles.safeAreaView, page === 'Lottie' ? styles.greyColor : null]}
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
      }}>
      <GestureHandlerRootView style={styles.gestureStyle}>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: 'transparent',
            },
          }}>
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
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Login" component={Login} />
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
  pageStyle: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  greyColor: {backgroundColor: '#e5e5e5'},
});

export default App;
