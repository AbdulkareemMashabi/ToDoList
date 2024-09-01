package com.todolist;


import android.annotation.SuppressLint;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

import org.json.JSONException;
import org.json.JSONObject;
import java.util.Locale;

/**
 * Implementation of App Widget functionality.
 */
public class ToDoListWidget extends AppWidgetProvider {

    @SuppressLint("SuspiciousIndentation")
    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId) throws JSONException {

        SharedPreferences sharedPref = context.getSharedPreferences("group.abdulkareemMashabi", Context.MODE_PRIVATE);
        String stringJsonData = sharedPref.getString("toDoListAbdulkareem", "{\"mainTask\":{\"title\":\"\", \"date\":\"\", \"status\":\"false\"}, \"subTasks\":[]}");
        JSONObject jsonObject = new JSONObject(stringJsonData);

        // Access the mainTask object
        JSONObject mainTask = jsonObject.getJSONObject("mainTask");

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.to_do_list_widget);

        String title = mainTask.getString("title");

        String currentLanguage = Locale.getDefault().getLanguage();

        // Access the title and date
        views.setTextViewText(R.id.textView, title);
        views.setTextViewText(R.id.textView2, mainTask.getString("date"));
        if(!title.isEmpty()) {
            if (mainTask.getString("status") == "true")
                views.setImageViewResource(R.id.imageView, R.drawable.baseline_check_24);
            else
                views.setImageViewResource(R.id.imageView, R.drawable.baseline_pending_actions_24);
        }
        else {
            views.setImageViewResource(R.id.imageView, 0);
         if (currentLanguage == "en")
                views.setTextViewText(R.id.textView, "No Favorite Task found");
            else
                views.setTextViewText(R.id.textView, "لم يتم العثور على مهمات مفضلة");
        }

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            try {
                updateAppWidget(context, appWidgetManager, appWidgetId);
            } catch (JSONException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}