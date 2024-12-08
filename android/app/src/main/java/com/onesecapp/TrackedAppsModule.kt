package com.onesecapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray

class TrackedAppsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "TrackedApps"
    }

    @ReactMethod
    fun updateTrackedApps(apps: ReadableArray) {
        val appList = mutableListOf<String>()
        for (i in 0 until apps.size()) {
            val appName = apps.getString(i)
            if (appName != null) {
                appList.add(appName)
            }
        }

        // Update the tracked apps in PauseAccessibilityService
        PauseAccessibilityService.updateTrackedApps(appList)
    }
}
