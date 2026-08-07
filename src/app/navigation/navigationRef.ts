import { createNavigationContainerRef } from '@react-navigation/native';

export type RootStackParamList = {
  History: undefined;

  WebView: {
    url: string;
  };

  Promo: {
    id: string;
  };
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
