package com.notificationproject.notifications.initialization

import android.content.Context

import com.onesignal.OneSignal
import com.onesignal.debug.LogLevel
import com.onesignal.notifications.INotificationClickEvent
import com.onesignal.notifications.INotificationClickListener

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

import com.notificationproject.notifications.events.NotificationEventBus
import com.notificationproject.notifications.mapper.NotificationMapper

object OneSignalInitializer {

    fun initialize(context: Context) {
        OneSignal.Debug.logLevel = LogLevel.VERBOSE

        OneSignal.initWithContext(
            context,
            "248420e1-1745-4a3d-bed6-4971de644b30",
        )

        OneSignal.Notifications.addClickListener(
            object : INotificationClickListener {
                override fun onClick(event: INotificationClickEvent) {
                    val record = NotificationMapper.from(
                        event.notification
                    )

                    NotificationEventBus.emitClicked(record)
                }
            }
        )

        CoroutineScope(Dispatchers.IO).launch {
            OneSignal.Notifications.requestPermission(false)
        }
    }
}