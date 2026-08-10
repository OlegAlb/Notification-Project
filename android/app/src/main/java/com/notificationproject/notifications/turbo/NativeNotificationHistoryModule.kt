package com.notificationproject.notifications.turbo

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableArray
import com.notificationproject.notifications.model.NotificationRecord
import com.notificationproject.NativeNotificationHistorySpec
import com.notificationproject.notifications.events.NotificationEventBus
import com.notificationproject.notifications.storage.NotificationHistoryStore

class NativeNotificationHistoryModule(
    reactContext: ReactApplicationContext,
) : NativeNotificationHistorySpec(reactContext) {

    private val store = NotificationHistoryStore(reactContext)

    private val notificationReceivedListener =
        { notification: NotificationRecord ->
            emitOnNotificationReceived(
                notification.toWritableMap()
            )
        }

    private val notificationClickedListener =
        { notification: NotificationRecord ->
            emitOnNotificationClicked(
                notification.toWritableMap()
            )
        }

    init {
        NotificationEventBus.subscribeReceived(
            notificationReceivedListener
        )

        NotificationEventBus.subscribeClicked(
            notificationClickedListener
        )
    }

    override fun getNotifications(): WritableArray {
        val array = Arguments.createArray()

        store.getAll().forEach { notification ->
            array.pushMap(notification.toWritableMap())
        }

        return array
    }

    override fun markAsRead(id: String) {
        store.markAsRead(id)
    }

    override fun markAllAsRead() {
        store.markAllAsRead()
    }

    override fun invalidate() {
        NotificationEventBus.unsubscribeReceived(
            notificationReceivedListener
        )

        NotificationEventBus.unsubscribeClicked(
            notificationClickedListener
        )

        super.invalidate()
    }

    companion object {
        const val NAME = "NativeNotificationHistory"
    }
}