import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './navigationRef';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['notificationproject://'],

  config: {
    screens: {
      History: '',

      Promo: {
        path: 'promo/:id',
      },
    },
  },
};
