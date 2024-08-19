//
//  ToDoAppWidget.swift
//  ToDoAppWidget
//
//  Created by Abdulkareem Mashabi on 25/01/1446 AH.
//

import WidgetKit
import SwiftUI

struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
      SimpleEntry(date: Date(), configuration: ToDoAppConfigurationIntent() ,themConfig: ToDoThemeEnum.dark, data: defaultData())
    }

    func getSnapshot(for configuration: ToDoAppConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
      let entry = SimpleEntry(date: Date(), configuration: configuration, themConfig:configuration.themeConfig, data: defaultData())
        completion(entry)
    }

    func getTimeline(for configuration: ToDoAppConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
      let userDefaults = UserDefaults.init(suiteName: "group.abdulkareemMashabi")
      if userDefaults != nil {
        let entryDate = Date()
        if let savedData = userDefaults!.value(forKey: "toDoListAbdulkareem") as? String {
          let decoder = JSONDecoder()
          let data = savedData.data(using: .utf8)
          if let parsedData = try? decoder.decode(WidgetData.self, from: data!) {
            let nextRefresh = Calendar.current.date(byAdding: .second, value: 5, to: entryDate)!
            let entry = SimpleEntry(date: nextRefresh, configuration: configuration, themConfig: configuration.themeConfig ,data: parsedData)
            let timeline = Timeline(entries: [entry], policy: .never)
            completion(timeline)
          } else {
            print("Could not parse data")
          }
        } else {
          let nextRefresh = Calendar.current.date(byAdding: .second, value: 5, to: entryDate)!
          let entry = SimpleEntry(date: nextRefresh, configuration: configuration, themConfig: configuration.themeConfig, data: WidgetData(mainTask:  nil, subTasks: nil))
          let timeline = Timeline(entries: [entry], policy: .never)
          
          
          completion(timeline)
          
        }
      }
      
    }
}

struct Task: Decodable {
  let title: String
  let status: Bool
}

struct WidgetData: Decodable {
  let mainTask: Task?
  let subTasks: [Task]?
}

func defaultData() -> WidgetData {
  return WidgetData(mainTask:  Task(title:"Buy a mobile", status: false), subTasks: [Task(title:"Work in a shop", status: true),Task(title:"Save money", status: false)])
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ToDoAppConfigurationIntent
    let themConfig : ToDoThemeEnum
    let data: WidgetData
}

func drawOneLine(_ task: Task,_ color: Color) -> some View {
  
  return HStack(alignment: .center){
    Group {
        if task.status {
            Image("checkMark").resizable().frame(width: 24, height: 24)
        } else {
            Circle().stroke(Color.blue, lineWidth: 4).frame(width: 18, height: 18)
        }
    }
    Text(task.title).foregroundColor(color)
  }.frame(maxWidth: .infinity, alignment: .leading)
}

struct ToDoAppWidgetEntryView : View {
  var entry: Provider.Entry


  var body: some View {
    let color = entry.themConfig  == ToDoThemeEnum.dark ? Color.white : Color.black

      ZStack{
        ContainerRelativeShape().fill(entry.themConfig  == ToDoThemeEnum.dark ? Color.black : Color.white)
        if (entry.data.mainTask != nil){
        VStack {
          drawOneLine(entry.data.mainTask!,color)
          if (entry.data.subTasks != nil && !entry.data.subTasks!.isEmpty){
            RoundedRectangle(cornerRadius: 16)
              .fill(color)
              .frame(height: 10)
            VStack{
              ForEach(entry.data.subTasks!, id: \.title) { item in
                drawOneLine(item,color)
              }}.padding(.leading,8)
          }
          
        }.padding()
      }
        else {
            Text("No Favorite Task Found").foregroundColor(color)
    }

    }

  }
}

struct ToDoAppWidget: Widget {
    let kind: String = "ToDoAppWidget"

  var body: some WidgetConfiguration {
      IntentConfiguration(kind: kind, intent: ToDoAppConfigurationIntent.self, provider: Provider()) { entry in
        ToDoAppWidgetEntryView(entry: entry)
      }
      .configurationDisplayName("Favorite Task")
      .description("Keep track of your favorite task")
      .supportedFamilies([ .systemMedium, .systemLarge]).contentMarginsDisabled()
  }

}

struct CardWidget_Previews: PreviewProvider {
  static var previews: some View {
    ToDoAppWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ToDoAppConfigurationIntent(), themConfig: ToDoThemeEnum.light, data: defaultData()))
      .previewContext(WidgetPreviewContext(family: .systemSmall))
  }
}
