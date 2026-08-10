import type { CodegenTypes, TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface NotificationRecord {
  id: string;
  title: string;
  body: string;
  receivedAt: string;
  imageURL: string | null;
  deepLink: string | null;
  externalURL: string | null;
  isRead: boolean;
}

export interface Spec extends TurboModule {
  getNotifications(): NotificationRecord[];
  markAsRead(id: string): void;
  markAllAsRead(): void;

  readonly onNotificationReceived: CodegenTypes.EventEmitter<NotificationRecord>;
  readonly onNotificationClicked: CodegenTypes.EventEmitter<NotificationRecord>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeNotificationHistory',
);
