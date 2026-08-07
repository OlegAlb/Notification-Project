package com.notificationproject.notifications.extension

import androidx.annotation.Keep
import com.notificationproject.notifications.recorder.NotificationHistoryRecorder
import com.onesignal.notifications.INotificationReceivedEvent
import com.onesignal.notifications.INotificationServiceExtension


@Keep
class NotificationServiceExtension : INotificationServiceExtension {

    override fun onNotificationReceived(
        event: INotificationReceivedEvent
    ) {
        val recorder =
            NotificationHistoryRecorder.create(
                event.context
            )

        recorder.record(
            event.notification
        )
    }
}