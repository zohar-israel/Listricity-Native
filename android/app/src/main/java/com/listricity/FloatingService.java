package com.listricity;

import com.facebook.react.ReactActivity;

import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

public class FloatingService extends Service implements OnClickListener, View.OnTouchListener {

    private WindowManager mWindowManager;
    private View mFloatingView;
    private ImageView mainButton;
    private LinearLayout showLin;
    private ImageView btnInfo;
    private WindowManager.LayoutParams params;
    private ImageView btnClose;
    int initialX = 0;
    int initialY = 0;
    float initialTouchX = 0;
    float initialTouchY = 0;

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Toast.makeText(this, "in service", Toast.LENGTH_LONG).show();

        //Inflate the floating view layout we created
        mFloatingView = LayoutInflater.from(this).inflate(R.layout.floating_layout, null);

        //Add the view to the window.
        params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.TYPE_PHONE,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                PixelFormat.TRANSLUCENT);

        // Set the position to the top right corner of the screen
        params.gravity = Gravity.TOP | Gravity.LEFT;
        params.x = 50;
        params.y = 50;

        //Add the view to the window
        mWindowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
        mWindowManager.addView(mFloatingView, params);

        mainButton = (ImageView) mFloatingView.findViewById(R.id.mainButton);
        btnClose = (ImageView) mFloatingView.findViewById(R.id.closeBtn);
        btnInfo = (ImageView) mFloatingView.findViewById(R.id.btnInfo);
        showLin = (LinearLayout) mFloatingView.findViewById(R.id.showLin);

        mainButton.setOnClickListener(this);
        btnInfo.setOnClickListener(this);
        btnClose.setOnClickListener(this);

        //Drag and move floating view using user's touch action.
        mainButton.setOnTouchListener(this);
    }

    @Override
    public void onClick(View view) {
        if (view == btnClose) {
            int vis = (showLin.getVisibility() == View.VISIBLE) ? View.GONE : View.VISIBLE;
            showLin.setVisibility(vis);
        }
        if (view == btnInfo) {
            Intent intent = new Intent(FloatingService.this, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);

            // Stop the service and Remove the Floating Button when our app opens...
            stopSelf();
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (null != mFloatingView && null != mWindowManager)
            mWindowManager.removeView(mFloatingView);
    }

    // Shows message to the user...
    void showMessage(String message) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show();
    }

    @Override
    public boolean onTouch(View view, MotionEvent motionEvent) {

        showLin.setVisibility(View.GONE);

        switch (motionEvent.getAction()) {
            case MotionEvent.ACTION_DOWN:

                //remember the initial position.
                //initialX = params.x;
                //initialY = params.y;

                //get the touch location
                initialTouchX = motionEvent.getRawX();
                initialTouchY = motionEvent.getRawY();
                return true;
            case MotionEvent.ACTION_UP:
                return true;
            case MotionEvent.ACTION_MOVE:
                //Calculate the X and Y coordinates of the view.
                params.x = (int) (motionEvent.getRawX() - initialTouchX) - initialX;
                params.y = (int) (motionEvent.getRawY() - initialTouchY) - initialY;

                //Update the layout with new X & Y coordinate
                mWindowManager.updateViewLayout(mFloatingView, params);
                return true;
        }
        return false;
    }

}
