// import { LogLevel, OneSignal } from 'react-native-onesignal';

// import { OneSignalNotificationHandler } from './OneSignalNotificationHandler';

// const ONE_SIGNAL_APP_ID = '248420e1-1745-4a3d-bed6-4971de644b30';

// export class OneSignalService {
//   private handler?: OneSignalNotificationHandler;

//   initialize(handler: OneSignalNotificationHandler) {
//     this.handler = handler;

//     OneSignal.Debug.setLogLevel(LogLevel.Verbose);

//     OneSignal.initialize(ONE_SIGNAL_APP_ID);

//     OneSignal.Notifications.requestPermission(false);

//     OneSignal.Notifications.addEventListener('click', this.handler.onClick);

//     OneSignal.Notifications.addEventListener(
//       'foregroundWillDisplay',
//       this.handler.onForegroundDisplay,
//     );
//   }

//   async getSubscriptionId() {
//     return OneSignal.User.pushSubscription.getIdAsync();
//   }

//   dispose() {
//     if (!this.handler) {
//       return;
//     }

//     OneSignal.Notifications.removeEventListener('click', this.handler.onClick);

//     OneSignal.Notifications.removeEventListener(
//       'foregroundWillDisplay',
//       this.handler.onForegroundDisplay,
//     );
//   }
// }
