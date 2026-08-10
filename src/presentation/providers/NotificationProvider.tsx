import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  notificationClickHandler,
  notificationStorage,
} from '../../app/container';
import NativeNotificationHistory from '../../../specs/NativeNotificationHistory';
import { PushNotification } from '../../domain/PushNotification';

interface NotificationContextValue {
  notifications: PushNotification[];

  refresh(): void;

  markAsRead(id: string): void;

  markAllAsRead(): void;
}

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: PropsWithChildren) {
  const [notifications, setNotifications] = useState<PushNotification[]>([]);

  const refresh = useCallback(() => {
    const data = notificationStorage.getAll();

    setNotifications(data);
  }, []);

  const markAsRead = useCallback(
    (id: string) => {
      const notification = notifications.find(item => item.id === id);

      if (!notification) {
        return;
      }

      notificationStorage.markAsRead(id);

      refresh();
    },
    [notifications, refresh],
  );

  const markAllAsRead = useCallback(() => {
    notificationStorage.markAllAsRead();

    refresh();
  }, [refresh]);

  useEffect(() => {
    refresh();

    const subscription = NativeNotificationHistory.onNotificationReceived(
      () => {
        refresh();
      },
    );

    return () => {
      subscription.remove();
    };
  }, [refresh]);

  useEffect(() => {
    const clickedSubscription = NativeNotificationHistory.onNotificationClicked(
      notification => {
        notificationClickHandler.handle(notification);
      },
    );

    return () => {
      clickedSubscription.remove();
    };
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      refresh,
      markAsRead,
      markAllAsRead,
    }),
    [notifications, refresh, markAsRead, markAllAsRead],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
