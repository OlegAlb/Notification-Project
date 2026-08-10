import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type NotificationRecord = {
  id: string;
  title: string;
  body: string;
  receivedAt: string;
  imageURL: string | null;
  deepLink: string | null;
  externalURL: string | null;
  isRead: boolean;
};

export interface Spec extends TurboModule {
  getNotifications(): NotificationRecord[];
  markAsRead(id: string): void;
  markAllAsRead(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeNotificationHistory',
);
