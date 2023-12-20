import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Reactotron from 'reactotron-react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Lottie from './Screens/Lottie/Lottie';
import {
  SafeAreaView,
  StyleSheet,
  Keyboard,
  ImageBackground,
  BackHandler,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Dashboard from './Screens/Dashboard/Dashboard';
import Login from './Screens/Login/Login';
import ForgetPassword from './Screens/ForgetPassword/ForgetPassword';
import Register from './Screens/Register/Register';
import {pagesNames, pagesUseWaveImage, toastConfig} from './helpers/utils';
import {Images} from './assets/Images';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import CreateNewTask from './Screens/CreateNewTask/CreateNewTask';
import {CreateNewTaskImages} from './assets/CreateNewTaskImages';

const Stack = createStackNavigator();

export const App = () => {
  const [currentPage, setCurrentPage] = useState(pagesNames.lottie);
  const {isLoading} = useSelector(state => state.main);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => !isLoading);
  }, []);

  const getRandomImages = () => {
    if (pagesUseWaveImage.includes(currentPage)) return Images.waves;
    else if (currentPage === pagesNames.createNewTask) {
      const values = Object.values(CreateNewTaskImages);
      const randomValue = values[Math.floor(Math.random() * values.length)];
      return randomValue;
    } else return null;
  };

  return (
    <SafeAreaView
      pointerEvents={isLoading ? 'none' : 'auto'}
      style={[
        styles.safeAreaView,
        currentPage === pagesNames.lottie ? styles.greyColor : null,
      ]}
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
      }}>
      <GestureHandlerRootView style={styles.gestureStyle}>
        <ImageBackground style={styles.image} source={getRandomImages()}>
          <NavigationContainer
            theme={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                background: 'transparent',
              },
            }}>
            <Stack.Navigator
              initialRouteName={pagesNames.lottie}
              screenOptions={{
                headerStyle: styles.headerPageTitle,
                headerTitleAlign: 'center',
                cardStyle:
                  currentPage !== pagesNames.createNewTask
                    ? styles.pageStyle
                    : null,
              }}>
              <Stack.Screen
                name={pagesNames.lottie}
                component={Lottie}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={pagesNames.dashboard}
                component={Dashboard}
                listeners={{
                  focus: () => {
                    setCurrentPage(pagesNames.dashboard);
                  },
                }}
              />
              <Stack.Screen
                name={pagesNames.login}
                component={Login}
                listeners={{
                  focus: () => {
                    setCurrentPage(pagesNames.login);
                  },
                }}
              />
              <Stack.Screen
                name={pagesNames.forgetPassword}
                component={ForgetPassword}
                listeners={{
                  focus: () => {
                    setCurrentPage(pagesNames.forgetPassword);
                  },
                }}
              />
              <Stack.Screen
                name={pagesNames.register}
                component={Register}
                listeners={{
                  focus: () => {
                    setCurrentPage(pagesNames.register);
                  },
                }}
              />
              <Stack.Screen
                name={pagesNames.createNewTask}
                component={CreateNewTask}
                listeners={{
                  focus: () => {
                    setCurrentPage(pagesNames.createNewTask);
                  },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ImageBackground>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1, backgroundColor: 'white'},
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
  image: {flex: 1},
});

export default App;
