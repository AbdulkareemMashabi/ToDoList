//
//  lock_screen_widget.swift
//  lock screen widget
//
//  Created by Ahmed Awaad on 31/05/2023.
//  Copyright © 2023 Facebook. All rights reserved.
//

import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date())
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date())
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
}

struct lock_screen_widgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
      Image("ToDoListLock")
        .resizable()
        .scaledToFit()
    }
}

@main
struct lock_screen_widget: Widget {
    let kind: String = "lock_screen_widget"

  private var supportedFamilies: [WidgetFamily] {
           if #available(iOSApplicationExtension 16.0, *) {
               return [
                   
                   .accessoryCircular,
             
               ]
           } else {
               return [
                   
               ]
           }
       }
  
  
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            lock_screen_widgetEntryView(entry: entry)
        }
        .configurationDisplayName("To Do List Widget")
        .description("Quick access to To Do List App")
        .supportedFamilies(supportedFamilies)
    }
}

struct lock_screen_widget_Previews: PreviewProvider {
    static var previews: some View {
        lock_screen_widgetEntryView(entry: SimpleEntry(date: Date()))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
