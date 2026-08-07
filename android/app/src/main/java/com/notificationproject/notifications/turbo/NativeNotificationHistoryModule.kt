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

    override fun markRead(id: String) {
        store.markRead(id)
    }

    override fun markAllRead() {
        store.markAllRead()
    }

    override fun clear() {
        store.clear()
    }


    companion object {
        const val NAME = "NativeNotificationHistory"
    }
}