if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NativeModules} from 'react-native';
import Locale from './helpers/localization';
import en from './Language/en.json';
import ar from './Language/ar.json';
import {Provider} from 'react-redux';
import {store} from './helpers/Redux/store';

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;
const lang = deviceLanguage.slice(0, 2);
Locale.config({en: en, ar: ar});
Locale.setLanguage(lang);

const rootComponent = () => {
  <Provider store={store}>
    <App />
  </Provider>;
};

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
));
