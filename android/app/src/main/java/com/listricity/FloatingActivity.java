package com.listricity;

import com.facebook.react.ReactActivity;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Toast;

public class FloatingActivity extends AppCompatActivity {

    private static final int APP_OVERLAY_PERMISSION = 1000;
    private Context context;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_floating);

        context = this;

        // Asking for permission from user...
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(context)) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + getPackageName()));
            startActivityForResult(intent, APP_OVERLAY_PERMISSION);
        }

        findViewById(R.id.createBtn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(context))) {
                    // Permission was already granted..starting service for creating the Floating Button UI...
                    startService(new Intent(context, FloatingService.class));
                    finish();
                }
            }
        });

        findViewById(R.id.createBtn).setVisibility(checkIfOverlayPermissionGranted() ? View.VISIBLE : View.GONE);
    }

    Boolean checkIfOverlayPermissionGranted() {
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && Settings.canDrawOverlays(context);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (!(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(context))) {
            // Permission was already granted..starting service for creating the Floating Button UI...
            startService(new Intent(context, FloatingService.class));
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == APP_OVERLAY_PERMISSION) {
            showMessage(checkIfOverlayPermissionGranted() ? "Overlay Permission Granted :)" : "Overlay Permission Denied :(");
            findViewById(R.id.createBtn).setVisibility(checkIfOverlayPermissionGranted() ? View.VISIBLE : View.GONE);
        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }

    // Shows message to the user...
    void showMessage(String message) {
        Toast.makeText(context, message, Toast.LENGTH_LONG).show();
    }

}
