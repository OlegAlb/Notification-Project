import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface NotificationRecord {
  id: string;
  title: string;
  body: string;
  receivedAt: number;
  imageUrl?: string;
  actionType?: string;
  actionValue?: string;
  isRead: boolean;
}

export interface Spec extends TurboModule {
  getNotifications(): NotificationRecord[];

  markRead(id: string): void;

  markAllRead(): void;

  clear(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeNotificationHistory',
);
