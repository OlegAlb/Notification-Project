import React from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PushNotification } from '../../../domain/entities/PushNotification';
import { NotificationCard } from '../../components/NotificationCard/NotificationCard';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { useNotifications } from '../../hooks/useNotifications';
import { styles } from './HistoryScreen.styles';
import { parseDeepLink } from '../../../shared/utils/parseDeepLink';

export const HistoryScreen = () => {
  const { notifications, markAsRead, markAllAsRead, refresh } =
    useNotifications();

  const navigation = useAppNavigation();

  const handleNotificationPress = async (notification: PushNotification) => {
    await markAsRead(notification.id);

    if (notification.action?.type === 'deeplink') {
      const { screen, id } = parseDeepLink(notification.action.value);

      if (screen === 'promo') {
        navigation.navigate('Promo', {
          id,
        });
      }

      return;
    }

    if (notification.action?.type === 'url') {
      navigation.navigate('WebView', {
        url: notification.action.value,
      });
    }
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
