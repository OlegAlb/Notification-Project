import { WebView } from 'react-native-webview';

import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../../../app/navigation/navigationRef';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  route: RouteProp<RootStackParamList, 'WebView'>;
};

export function WebViewScreen({ route }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <WebView
        source={{
          uri: route.params.url,
        }}
      />
    </SafeAreaView>
  );
}
