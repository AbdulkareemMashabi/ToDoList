import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Lottie from '../Screens/Lottie/Lottie';
import {BackHandler} from 'react-native';
import Dashboard from '../Screens/Dashboard/Dashboard';
import Login from '../Screens/Login/Login';
import ForgetPassword from '../Screens/ForgetPassword/ForgetPassword';
import Register from '../Screens/Register/Register';
import {pagesNames, toastConfig} from '../helpers/utils';
import {useSelector} from 'react-redux';
import CreateNewTask from '../Screens/CreateNewTask/CreateNewTask';
import TaskDetailsScreen from '../Screens/TaskDetailsScreen/TaskDetailsScreen';
import AccountDeletion from '../Screens/AccountDeletion/AccountDeletion';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import styles from './App.style';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export const App = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const {isLoading, isLoadingOverLay} = useSelector(state => state.main);

  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      () => !isLoading || !isLoadingOverLay,
    );
  }, []);

  return (
    <>
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
            contentStyle: styles.pageStyle,
            headerTransparent: true,
            headerBackTitleVisible: false,
            headerTintColor: 'black',
            headerTitleStyle:
              currentPage === pagesNames.taskDetailsScreen
                ? styles.title
                : null,
          }}>
          <Stack.Screen
            name={pagesNames.lottie}
            component={Lottie}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name={pagesNames.dashboard} component={Dashboard} />
          <Stack.Screen name={pagesNames.login} component={Login} />
          <Stack.Screen
            name={pagesNames.forgetPassword}
            component={ForgetPassword}
          />
          <Stack.Screen name={pagesNames.register} component={Register} />
          <Stack.Screen
            name={pagesNames.taskDetailsScreen}
            component={TaskDetailsScreen}
            listeners={{
              focus: () => {
                setCurrentPage(pagesNames.taskDetailsScreen);
              },
              beforeRemove: () => {
                setCurrentPage(null);
              },
            }}
          />
          <Stack.Screen
            name={pagesNames.deleteAccount}
            component={AccountDeletion}
          />
          <Stack.Screen
            name={pagesNames.popUp}
            component={PopUp}
            options={{
              presentation: 'transparentModal',
              headerShown: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
            name={pagesNames.createNewTask}
            component={CreateNewTask}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
