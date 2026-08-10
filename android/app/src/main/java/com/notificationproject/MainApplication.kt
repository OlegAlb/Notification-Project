package com.notificationproject

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

import com.notificationproject.notifications.turbo.NativeNotificationHistoryPackage
import com.notificationproject.notifications.initialization.OneSignalInitializer

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
          add(NativeNotificationHistoryPackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    OneSignalInitializer.initialize(this)
    loadReactNative(this)
  }
}
