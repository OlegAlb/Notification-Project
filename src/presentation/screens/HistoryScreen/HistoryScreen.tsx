import React from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { notificationClickHandler } from '../../../app/container';
import { PushNotification } from '../../../domain/PushNotification';
import NotificationCard from '../../components/NotificationCard/';
import { useNotifications } from '../../hooks/useNotifications';
import { styles } from './HistoryScreen.styles';

export const HistoryScreen = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  const handleNotificationPress = (notification: PushNotification) => {
    markAsRead(notification.id);
    notificationClickHandler.handle(notification);
  };

  const renderSeparator = () => <View style={styles.separator} />;

  const renderItem: ListRenderItem<PushNotification> = ({ item }) => (
    <NotificationCard notification={item} onPress={handleNotificationPress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headline}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
      />
      <View style={styles.content}>
        <TouchableOpacity onPress={markAllAsRead} style={styles.button}>
          <Text style={styles.buttonText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
