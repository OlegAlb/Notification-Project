import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from './navigation/navigationRef';

import { RootNavigator } from './navigation/RootNavigator';

import { oneSignalHandler, oneSignalService } from './container';
import { NotificationProvider } from '../presentation/providers/NotificationProvider';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    oneSignalService.initialize(oneSignalHandler);

    return () => {
      oneSignalService.dispose();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <NotificationProvider>
        <RootNavigator />
      </NotificationProvider>
    </NavigationContainer>
  );
};

export default App;
