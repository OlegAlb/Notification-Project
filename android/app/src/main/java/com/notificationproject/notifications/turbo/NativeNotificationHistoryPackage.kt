package com.notificationproject.notifications.turbo

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NativeNotificationHistoryPackage : BaseReactPackage() {

    override fun getModule(
        name: String,
        reactContext: ReactApplicationContext,
    ): NativeModule? {
        return if (name == NativeNotificationHistoryModule.NAME) {
            NativeNotificationHistoryModule(reactContext)
        } else {
            null
        }
    }

    override fun getReactModuleInfoProvider() =
        ReactModuleInfoProvider {
            mapOf(
                NativeNotificationHistoryModule.NAME to ReactModuleInfo(
                    name = NativeNotificationHistoryModule.NAME,
                    className = NativeNotificationHistoryModule.NAME,
                    canOverrideExistingModule = false,
                    needsEagerInit = false,
                    isCxxModule = false,
                    isTurboModule = true,
                ),
            )
        }
}