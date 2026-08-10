import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from './navigation/navigationRef';

import { RootNavigator } from './navigation/RootNavigator';

import { NotificationProvider } from '../presentation/providers/NotificationProvider';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <NotificationProvider>
        <RootNavigator />
      </NotificationProvider>
    </NavigationContainer>
  );
};

export default App;
