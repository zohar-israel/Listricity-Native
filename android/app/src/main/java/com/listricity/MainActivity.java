package com.listricity;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.app.FragmentManager;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.provider.MediaStore;
import android.provider.Settings;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.os.Bundle;

import android.content.Intent;  
import android.content.res.Configuration;  
import android.widget.Toast;

import java.io.FileNotFoundException;
import java.io.InputStream;

public class MainActivity extends ReactActivity {

    private static final int APP_OVERLAY_PERMISSION = 1000;

    public void onNewIntent(Intent intent) {
        processIntent(intent);
    }

    private void processIntent(Intent intent){
        String action = intent.getAction();
        String type = intent.getType();
        String filepath = "";

        Log.e("ZZZZ", "main new intent: " + type + " , " + action);

        // only handle VIEW actions
        if (Intent.ACTION_VIEW.equals(action)) {
            Uri file_uri = intent.getData();
            Log.e("ZZZZ", "uri : " + file_uri.toString());

            // most sharing apps allow custom mime types
            // canceled since we really care about whatsapp which doesn't

//            if("application/vnd.listricity".equals(type)){
//                filepath = file_uri.getPath();
//
//                Log.e("ZZZZ", "by type: " + type + " " + filepath);
//
//                // check if the intent contains a real path
//                if(filepath.endsWith(".listricity") || file_uri.toString().startsWith("file://")) {
//                    Log.e("ZZZZ", "by type final simple path: "+ filepath);
//                    sendToReact(filepath);
//                }
//                else{
//                    // extract the real path from the intent
//                    Log.e("ZZZZ", "by type extracting real path from " + file_uri);
//                    String messgae = getRealPathOrContentFromUri(this, file_uri);
////                    Log.e("ZZZZ", "by type final complex path: " + filepath);
//                    if(messgae!=null) {
//                        sendToReact(messgae);
//                    }
//                }
//            }
//
//            else

            if (file_uri != null) {
                // whatsapp changes the mime type to application/octet-stream
                filepath = file_uri.getPath();
                Log.e("ZZZZ", "changed mime type path: "+ filepath);
                if(filepath.endsWith(".listricity") || file_uri.toString().startsWith("file://")){
                    // works on plain files
                    Log.e("ZZZZ", "changed mime type final simple path: "+ filepath);
                    sendToReact(filepath);
                } else {
                    // Get the file from the intent object
                    // works on old versions of whatsapp
                    // or the content of the file for the new versions
                    Log.e("ZZZZ", "changed mime type extracting from " + file_uri);
                    String messgae = getRealPathOrContentFromUri(this, file_uri);
                    // Log.e("ZZZZ", "changed mime type final complex path: " + filepath);
                    if(messgae != null) {
                        sendToReact(messgae);
                    } else {
                        Log.e("ZZZZ", "Could not extract path or content from intent");
                    }
                }
            } else {
                Log.e("ZZZZ", "No file was attached to the intent");
            }
        }
    }
    public void sendToReact(String message){
        Log.e("ZZZZ", "triggering react, path");
        WritableMap payload = Arguments.createMap();
        // Put data to map
        payload.putString("sharedplaylist",message);
        // Get EventEmitter from context and send event
        getReactNativeHost().getReactInstanceManager().getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onPlaylistOpened", payload);

    }

    public static String getRealPathOrContentFromUri(Context context, Uri contentUri) {
        Cursor cursor = null;
        try {
            String[] proj = { MediaStore.Images.Media.DATA };
            cursor = context.getContentResolver().query(contentUri, proj, null, null, null);
            int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            cursor.moveToFirst();
            return cursor.getString(column_index);
        }
        catch (Exception e){
            Log.e("ZZZZ","Error extracting path, going for content");
            try {
                InputStream inputStream = context.getContentResolver().openInputStream(contentUri);
                java.util.Scanner s = new java.util.Scanner(inputStream).useDelimiter("\\A");
                String json =  s.hasNext() ? s.next() : "";
                return json;

            } catch (FileNotFoundException ec) {
                Log.e("ZZZZ","Error extracting path, returning null");
                ec.printStackTrace();
                return null;
            }
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
    }

    Context context;
    public static FragmentManager fragmentManager;
    public static LayoutInflater layoutInflater;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

//        final Intent intent = getIntent();
//        if(intent!=null) {
//            new Handler().postDelayed(new Runnable() {
//                @Override
//                public void run() {
//                    processIntent(intent);
//                }
//            }, 1000);
//        }



//return;
//        context = this;
//        fragmentManager =this.getFragmentManager();
//        layoutInflater =this.getLayoutInflater();
//
//        // Asking for permission from user...
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(context)) {
//            Toast.makeText(context, "asking", Toast.LENGTH_LONG).show();
//            Intent permissionintent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + getPackageName()));
//            startActivityForResult(permissionintent, APP_OVERLAY_PERMISSION);
//        }
//        else{
//            Toast.makeText(context, "granted", Toast.LENGTH_LONG).show();
//            startService(new Intent(context, FloatingService.class));
//
//        }

    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Listricity";
    }

    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }










    Boolean checkIfOverlayPermissionGranted() {
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && Settings.canDrawOverlays(context);
    }

//    @Override
//    public void onActivityResult(int requestCode, int resultCode, Intent data) {
//        Toast.makeText(context, "oar", Toast.LENGTH_LONG).show();
//        if (requestCode == APP_OVERLAY_PERMISSION) {
//            //showMessage(checkIfOverlayPermissionGranted() ? "Overlay Permission Granted :)" : "Overlay Permission Denied :(");
//            //findViewById(R.id.createBtn).setVisibility(checkIfOverlayPermissionGranted() ? View.VISIBLE : View.GONE);
//
//            Toast.makeText(context, "oar 1", Toast.LENGTH_LONG).show();
//            if(checkIfOverlayPermissionGranted()) {
//                Toast.makeText(context, "starting service", Toast.LENGTH_LONG).show();
//                startService(new Intent(context, FloatingService.class));
//            }
//        } else {
//            super.onActivityResult(requestCode, resultCode, data);
//        }
//
//    }


}

