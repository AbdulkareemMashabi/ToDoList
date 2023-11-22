if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './helpers/Redux/store';
import Root from './Root';

const rootComponent = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

AppRegistry.registerComponent(appName, () => rootComponent);
