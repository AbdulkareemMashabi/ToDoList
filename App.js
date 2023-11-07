import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Reactotron from 'reactotron-react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Lottie from './Screens/Lottie/Lottie';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Dashboard from './Screens/Dashboard/Dashboard';

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
            }}>
            <Stack.Screen
              name="Lottie"
              component={Lottie}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Dashboard" component={Dashboard} />
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
  gestureStyle: {
    flex: 1,
  },
});

export default App;
