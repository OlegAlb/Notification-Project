import { NotificationNativeStorage } from '../infrastructure/native/NotificationNativeStorage';
import { NotificationClickHandler } from './notifications/NotificationClickHandler';

export const notificationStorage = new NotificationNativeStorage();

export const notificationClickHandler = new NotificationClickHandler();
