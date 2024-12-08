package com.onesecapp

import android.accessibilityservice.AccessibilityService
import android.content.Intent
import android.util.Log
import android.view.accessibility.AccessibilityEvent

class PauseAccessibilityService : AccessibilityService() {

    companion object {
        private val trackedApps = mutableListOf<String>() // Dynamic list of app package names

        fun updateTrackedApps(apps: List<String>) {
            trackedApps.clear()
            trackedApps.addAll(apps)
        }
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event?.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            val packageName = event.packageName.toString()
            Log.d("AccessibilityService", "Detected package: $packageName")

            // Redirect if the detected package is in the tracked list
            if (trackedApps.contains(packageName)) {
                redirectToPauseScreen(packageName)
            }
        }
    }

    private fun redirectToPauseScreen(packageName: String) {
        Log.d("AccessibilityService", "Redirecting due to detected app: $packageName")
        
        // Launch your React Native app
        val intent = Intent(this, MainActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        intent.putExtra("packageName", packageName) // Pass the app package name
        startActivity(intent)
    }

    override fun onInterrupt() {
        Log.d("AccessibilityService", "Accessibility service interrupted.")
    }
}
