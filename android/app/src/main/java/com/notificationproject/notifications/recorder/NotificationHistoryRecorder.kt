package com.notificationproject.notifications.recorder

import android.content.Context
import com.notificationproject.notifications.events.NotificationEventBus
import com.notificationproject.notifications.mapper.NotificationMapper
import com.notificationproject.notifications.storage.NotificationHistoryStore
import com.onesignal.notifications.INotification

class NotificationHistoryRecorder(
    private val store: NotificationHistoryStore,
) {

    fun record(notification: INotification) {
        val record = NotificationMapper.from(notification)

        store.save(record)

        NotificationEventBus.emitReceived(record)
    }

    companion object {

        fun create(context: Context): NotificationHistoryRecorder {
            return NotificationHistoryRecorder(
                NotificationHistoryStore(context)
            )
        }
    }
}