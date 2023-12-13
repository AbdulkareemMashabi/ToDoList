if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import Root from './src/Root';
import {store} from './src/helpers/Redux/store';

const rootComponent = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

AppRegistry.registerComponent(appName, () => rootComponent);
