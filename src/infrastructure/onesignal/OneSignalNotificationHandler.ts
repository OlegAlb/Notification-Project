import { navigate } from '../../app/navigation/navigationRef';

import { notificationRepository } from '../../app/container';
import { parseDeepLink } from '../../shared/utils/parseDeepLink';

export class OneSignalNotificationHandler {
  onClick = (event: any) => {
    const notification = event.notification;

    if (!notification) {
      return;
    }

    const id = notification.notificationId;

    if (id) {
      notificationRepository.markAsRead(id);
    }

    const data = notification.additionalData;

    if (!data) {
      return;
    }

    if (data.actionType === 'url') {
      navigate('WebView', {
        url: data.actionValue,
      });
    }

    if (data.actionType === 'deeplink') {
      const { screen, id } = parseDeepLink(notification.actionValue);

      if (screen === 'promo') {
        navigate('Promo', {
          id,
        });
      }
    }
  };

  onForegroundDisplay = (event: any) => {
    console.log('foreground', event);
  };
}
