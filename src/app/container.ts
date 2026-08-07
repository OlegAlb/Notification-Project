import { NotificationRepository } from '../domain/repositories/NotificationRepository';

import { NotificationNativeStorage } from '../infrastructure/native/NotificationNativeStorage';
import { NotificationNavigationHandler } from '../infrastructure/navigation/NotificationNavigationHandler';
import { OneSignalNotificationHandler } from '../infrastructure/onesignal/OneSignalNotificationHandler';
import { OneSignalService } from '../infrastructure/onesignal/OneSignalService';

import { NotificationRepositoryImpl } from '../infrastructure/repository/NotificationRepositoryImpl';

const notificationStorage = new NotificationNativeStorage();

export const notificationRepository: NotificationRepository =
  new NotificationRepositoryImpl(notificationStorage);

export const oneSignalHandler = new OneSignalNotificationHandler();

export const oneSignalService = new OneSignalService();

export const notificationNavigationHandler =
  new NotificationNavigationHandler();
