package com.listricity;

import com.facebook.react.ReactActivity;
// import co.apptailor.Worker.BaseReactPackage;
import android.view.WindowManager;
import android.os.Bundle;

import android.content.Intent; // <--- import
import android.content.res.Configuration; // <--- import

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
//        int keepTrying=10;
//        long lattempt=1000;
//        while (keepTrying>0) {
//            try {
//                super.onCreate(savedInstanceState);
//                keepTrying = 0;
//                // setContentView(R.layout.activity_main);
//            } catch (Exception e) {
//
//                keepTrying--;
//                try {
//                    Thread.sleep(lattempt);
//                } catch (Exception et) {
//                }
//            }
//        }
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

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
}
