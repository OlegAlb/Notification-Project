import { PushNotification } from '../../domain/PushNotification';
import { parseDeepLink } from '../../shared/utils/parseDeepLink';
import { navigate } from '../navigation/navigationRef';

export class NotificationClickHandler {
  handle(notification: PushNotification): void {
    if (notification.deepLink) {
      this.handleDeepLink(notification.deepLink);
      return;
    }

    if (notification.externalURL) {
      navigate('WebView', {
        url: notification.externalURL,
      });
    }
  }

  private handleDeepLink(deepLink: string): void {
    const { screen, id } = parseDeepLink(deepLink);

    if (screen === 'promo') {
      navigate('Promo', { id });
    }
  }
}
