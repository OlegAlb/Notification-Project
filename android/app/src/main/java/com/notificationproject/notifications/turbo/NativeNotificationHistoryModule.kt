package com.notificationproject.notifications.turbo

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.notificationproject.NativeNotificationHistorySpec
import com.notificationproject.notifications.storage.NotificationHistoryStore

class NativeNotificationHistoryModule(
    reactContext: ReactApplicationContext,
) : NativeNotificationHistorySpec(reactContext) {

    private val store = NotificationHistoryStore(reactContext)

    override fun getName() = NAME

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

    companion object {
        const val NAME = "NativeNotificationHistory"
    }
}