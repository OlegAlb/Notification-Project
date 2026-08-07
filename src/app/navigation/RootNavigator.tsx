import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HistoryScreen from '../../presentation/screens/HistoryScreen';
import { WebViewScreen } from '../../presentation/screens/WebViewScreen/WebViewScreen';

import { RootStackParamList } from './navigationRef';
import PromoScreen from '../../presentation/screens/PromoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name="Promo" component={PromoScreen} />
    </Stack.Navigator>
  );
}
