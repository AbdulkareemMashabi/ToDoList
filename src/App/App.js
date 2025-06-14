import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Lottie from '../Screens/Lottie/Lottie';
import {BackHandler} from 'react-native';
import Dashboard from '../Screens/Dashboard/Dashboard';
import Login from '../Screens/Login/Login';
import ForgetPassword from '../Screens/ForgetPassword/ForgetPassword';
import Register from '../Screens/Register/Register';
import {navigationRef, pagesNames, toastConfig} from '../helpers/utils';
import {useSelector} from 'react-redux';
import CreateNewTask from '../Screens/CreateNewTask/CreateNewTask';
import TaskDetailsScreen from '../Screens/TaskDetailsScreen/TaskDetailsScreen';
import AccountDeletion from '../Screens/AccountDeletion/AccountDeletion';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import PopUp from '../Components/PopUp/PopUp';
import {CustomHeaderNavigation} from '../Components/CustomHeaderNavigation/CustomHeaderNavigation';

const Stack = createNativeStackNavigator();

export const App = () => {
  const [navigationBarItems, setNavigationBarItems] = useState({
    rightItems: null,
    onBackPress: null,
    pageTitle: null,
  });
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
        ref={navigationRef}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'transparent',
          },
        }}>
        <Stack.Navigator
          initialRouteName={pagesNames.lottie}
          screenOptions={({route}) => ({
            header: () => (
              <CustomHeaderNavigation
                title={route.name}
                navigationBarItems={navigationBarItems}
              />
            ),
          })}>
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
            initialParams={{setNavigationBarItems}}
          />
          <Stack.Screen
            name={pagesNames.nonDismissibleLoginModal}
            component={Login}
            initialParams={{setNavigationBarItems}}
            options={{
              presentation: 'modal', // Shows as a modal
              gestureEnabled: false, // Prevent swipe-to-close
              headerShown: false, // Hide header
            }}
          />
          <Stack.Screen
            initialParams={{setNavigationBarItems}}
            name={pagesNames.login}
            component={Login}
          />
          <Stack.Screen
            name={pagesNames.forgetPassword}
            component={ForgetPassword}
          />
          <Stack.Screen name={pagesNames.register} component={Register} />
          <Stack.Screen
            initialParams={{setNavigationBarItems}}
            name={pagesNames.taskDetailsScreen}
            component={TaskDetailsScreen}
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
            }}
          />
          <Stack.Screen
            name={pagesNames.createNewTask}
            component={CreateNewTask}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} autoHide />
    </>
  );
};

export default App;
