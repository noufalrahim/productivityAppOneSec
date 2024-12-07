package com.onesecapp

import android.app.Activity
import android.content.Intent
import android.provider.Settings
import android.widget.Toast

class OverlayPermissionHelper(private val activity: Activity) {

    fun checkPermission(): Boolean {
        return Settings.canDrawOverlays(activity)
    }

    fun requestPermission() {
        val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        activity.startActivity(intent)
    }

    fun showOverlay() {
        if (checkPermission()) {
            // Display the overlay here
            Toast.makeText(activity, "Displaying pause screen...", Toast.LENGTH_SHORT).show()
        } else {
            requestPermission()
        }
    }
}
