export type NotificationAction =
  | {
      type: 'deeplink';
      value: string;
    }
  | {
      type: 'url';
      value: string;
    }
  | null;

export interface PushNotification {
  id: string;

  title: string;

  body: string;

  receivedAt: number;

  imageUrl?: string;

  action: NotificationAction;

  isRead: boolean;
}
