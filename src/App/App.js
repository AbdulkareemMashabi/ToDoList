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
import Toast from 'react-native-toast-message';
import PopUp from '../Components/PopUp/PopUp';
import Locale from '../helpers/localization';
import {getScreenOptions} from './utils';

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
          screenOptions={({navigation}) =>
            getScreenOptions(navigation, currentPage)
          }>
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
            options={{title: Locale.t('pagesNames.dashboard')}}
            listeners={{
              focus: () => {
                setCurrentPage(pagesNames.dashboard);
              },
              blur: () => {
                setCurrentPage(null);
              },
              beforeRemove: () => {
                setCurrentPage(null);
              },
            }}
          />
          <Stack.Screen
            name={pagesNames.nonDismissibleLoginModal}
            component={Login}
            options={{
              presentation: 'modal', // Shows as a modal
              gestureEnabled: false, // Prevent swipe-to-close
              headerShown: false, // Hide header
            }}
          />
          <Stack.Screen
            name={pagesNames.login}
            component={Login}
            options={{title: Locale.t('pagesNames.login')}}
          />
          <Stack.Screen
            name={pagesNames.forgetPassword}
            component={ForgetPassword}
            options={{title: Locale.t('pagesNames.forgetPassword')}}
          />
          <Stack.Screen
            name={pagesNames.register}
            component={Register}
            options={{title: Locale.t('pagesNames.register')}}
          />
          <Stack.Screen
            name={pagesNames.taskDetailsScreen}
            component={TaskDetailsScreen}
            options={{title: ''}}
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
            options={{title: Locale.t('pagesNames.deleteAccount')}}
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
            options={{title: Locale.t('pagesNames.createNewTask')}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
