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
    SimpleEntry(date: Date(), configuration: ToDoAppConfigurationIntent() ,themConfig: ToDoThemeEnum.dark, data: defaultData(), isArabic: isArabic())
    }

    func getSnapshot(for configuration: ToDoAppConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {      
      let entry = SimpleEntry(date: Date(), configuration: configuration, themConfig:configuration.themeConfig, data: defaultData(), isArabic: isArabic())
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
          var nextUpdateDate = Calendar.current.date(bySettingHour: 0, minute: 0, second: 0, of: entryDate)!
           nextUpdateDate = Calendar.current.date(byAdding: .day, value: 1, to: nextUpdateDate)!
            let entry = SimpleEntry(date: nextUpdateDate, configuration: configuration, themConfig: configuration.themeConfig ,data: parsedData, isArabic: isArabic())
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            completion(timeline)
          } 
        } 
      }
      
    }
}

func isArabic () -> Bool {
  let currentLanguage = Locale.preferredLanguages.first ?? "en"
  let isArabic = currentLanguage.contains("ar")

  return isArabic
}

struct Task: Decodable {
  let title: String
  let status: Bool
  let date: String?
  
  init(title: String, status: Bool, date: String? = nil) {
      self.title = title
      self.status = status
      self.date = date
  }
}

struct WidgetData: Decodable {
  let mainTask: Task?
  let subTasks: [Task]?
  
  init(mainTask: Task? = nil, subTasks: [Task]? = nil) {
      self.mainTask = mainTask
      self.subTasks = subTasks
  }
}

func defaultData() -> WidgetData {
  let title = isArabic() ? "شراء سيارة" : "Buy a mobile"
  let titleSubTask1 = isArabic() ? "العمل في بقالة" : "Work in a shop"
  let titleSubTask2 = isArabic() ? "توفير المال" : "Save money"
  return WidgetData(mainTask:  Task(title:title, status: false), subTasks: [Task(title:titleSubTask1, status: true),Task(title:titleSubTask2, status: false)])
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ToDoAppConfigurationIntent
    let themConfig : ToDoThemeEnum
    let data: WidgetData
    let isArabic: Bool
}

enum Colors {
    static let orange = Color.orange
    static let green = Color.green
    static let red = Color.red
}

func getBorderColor(date: String?, status: Bool) -> Color {
    if date == nil {
        return status ? Colors.green : Colors.orange
    }
    
    guard let days = getDateDifference(date: date!) else {
        return Colors.orange  // Default color if date parsing fails
    }
    
    if days >= 0 && !status {
        return Colors.orange
    } else if days < 0 && !status {
        return Colors.red
    } else {
        return Colors.green
    }
}

func getBorderColorSubTask(status: Bool) -> Color {
    return status ? Colors.green : Colors.orange
}

func getDateDifference(date: String) -> Int? {
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "dd/MM/yyyy"
    
    guard let endDate = dateFormatter.date(from: date) else {
        return nil
    }
    
    let startDate = Calendar.current.startOfDay(for: Date())
    
    let components = Calendar.current.dateComponents([.day], from: startDate, to: endDate)
  
    return components.day
}

func drawOneLine(_ task: Task,_ color: Color) -> some View {
  let circleColor = (task.date != nil) ? getBorderColor(date: task.date, status: task.status) : getBorderColorSubTask(status: task.status)
  
  
  return HStack(alignment: .center){
    Group {
        if task.status {
            Image("checkMark").resizable().frame(width: 24, height: 24)
        } else {
            Circle().stroke(circleColor, lineWidth: 4).frame(width: 18, height: 18)
        }
    }
    VStack{
      Text(task.title).foregroundColor(color).bold()
      if task.date != nil{
        Text(task.date!).foregroundColor(color).font(.caption)
      }
    }
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
          
        }.padding().environment(\.layoutDirection, entry.isArabic ? .rightToLeft: .leftToRight)
      }
        else {
          let currentLanguage = Locale.preferredLanguages.first ?? "en"
          let title = currentLanguage.contains("ar") ? "لم يتم العثور على مهمات مفضلة" : "No Favorite Task Found"
            Text(title).foregroundColor(color)
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
    ToDoAppWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ToDoAppConfigurationIntent(), themConfig: ToDoThemeEnum.light, data: defaultData(), isArabic: true))
      .previewContext(WidgetPreviewContext(family: .systemSmall))
  }
}
