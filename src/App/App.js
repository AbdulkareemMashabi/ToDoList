import 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Reactotron from 'reactotron-react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Lottie from '../Screens/Lottie/Lottie';
import {
  SafeAreaView,
  Keyboard,
  ImageBackground,
  BackHandler,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Dashboard from '../Screens/Dashboard/Dashboard';
import Login from '../Screens/Login/Login';
import ForgetPassword from '../Screens/ForgetPassword/ForgetPassword';
import Register from '../Screens/Register/Register';
import {
  backgroundColors,
  pagesNames,
  pagesUseWaveImage,
  toastConfig,
} from '../helpers/utils';
import {Images} from '../assets/Images';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import CreateNewTask from '../Screens/CreateNewTask/CreateNewTask';
import {CreateNewTaskImages} from '../assets/CreateNewTaskImages';
import {setBackgroundColor} from '../helpers/Redux/mainReducer';
import TaskDetailsScreen from '../Screens/TaskDetailsScreen/TaskDetailsScreen';
import LottieView from 'lottie-react-native';
import {getRandomNumber, getUserData} from './utils';
import PopUp from '../Components/PopUp/PopUp';

import styles from './App.style';

const Stack = createStackNavigator();

export const App = () => {
  const [currentPage, setCurrentPage] = useState(pagesNames.lottie);
  const [image, setImage] = useState(null);
  const {isLoading, isLoadingOverLay, userId} = useSelector(
    state => state.main,
  );
  const usedNumbers = useRef([]);
  const dispatch = useDispatch();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => !isLoading);
  }, []);

  useEffect(() => {
    if (pagesUseWaveImage.includes(currentPage)) setImage(Images.waves);
    else if (currentPage === pagesNames.createNewTask) {
      const keys = Object.keys(CreateNewTaskImages);
      const randomNumber = getRandomNumber(usedNumbers);
      const randomKey = keys[randomNumber];

      dispatch(setBackgroundColor(backgroundColors[randomKey]));
      setImage(CreateNewTaskImages[randomKey]);
    } else setImage(Images.light);
  }, [currentPage]);

  return (
    <ImageBackground style={styles.image} source={image}>
      <SafeAreaView
        pointerEvents={isLoading || isLoadingOverLay ? 'none' : 'auto'}
        style={[
          styles.safeAreaView,
          currentPage === pagesNames.lottie ? styles.greyColor : null,
        ]}
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
              initialRouteName={pagesNames.lottie}
              screenOptions={{
                headerTitleAlign: 'center',
                cardStyle: styles.pageStyle,
                headerTransparent: true,
                headerLeftLabelVisible: false,
                headerTintColor: 'black',
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
                    getUserData(userId, dispatch);
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
                name={pagesNames.taskDetailsScreen}
                component={TaskDetailsScreen}
                listeners={{
                  focus: () => {
                    setCurrentPage(pagesNames.taskDetailsScreen);
                  },
                }}
              />
              <Stack.Screen
                name={pagesNames.popUp}
                component={PopUp}
                options={{
                  presentation: 'transparentModal',
                  headerShown: false,
                  animationEnabled: false,
                }}
                listeners={{
                  focus: () => {
                    setCurrentPage(pagesNames.popUp);
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
                  beforeRemove: () => {
                    dispatch(setBackgroundColor(null));
                  },
                  blur: () => {
                    dispatch(setBackgroundColor(null));
                  },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
        <Toast config={toastConfig} />
        {isLoadingOverLay ? (
          <View style={styles.lottieView}>
            <LottieView
              source={require('../assets/Lottie/loading.json')}
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

export default App;
