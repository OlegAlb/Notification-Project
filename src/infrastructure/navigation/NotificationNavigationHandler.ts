import { navigate } from '../../app/navigation/navigationRef';

export class NotificationNavigationHandler {
  handle(actionType?: string, actionValue?: string) {
    if (!actionType || !actionValue) {
      return;
    }

    switch (actionType) {
      case 'deeplink':
        this.handleDeepLink(actionValue);
        break;

      case 'url':
        this.handleUrl(actionValue);
        break;
    }
  }

  private handleDeepLink(value: string) {
    const url = new URL(value);

    if (url.host === 'promo') {
      navigate('Promo', {
        id: url.pathname.replace('/', ''),
      });
    }
  }

  private handleUrl(url: string) {
    navigate('WebView', {
      url,
    });
  }
}
