package com.onesecapp

import android.accessibilityservice.AccessibilityService
import android.content.Intent
import android.util.Log
import android.view.accessibility.AccessibilityEvent

class PauseAccessibilityService : AccessibilityService() {

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event?.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            val packageName = event.packageName.toString()
            Log.d("AccessibilityService", "Detected package: $packageName")

            // Check if the detected package is WhatsApp
            if (packageName == "com.whatsapp") {
                redirectToPauseScreen()
            }
        }
    }

    private fun redirectToPauseScreen() {
        // Launch your React Native app
        val intent = Intent(this, MainActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        startActivity(intent)
    }

    override fun onInterrupt() {
        Log.d("AccessibilityService", "Accessibility service interrupted.")
    }
}
