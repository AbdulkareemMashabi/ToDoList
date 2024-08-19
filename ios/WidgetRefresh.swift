//
//  WidgetRefresh.swift
//  ToDoList
//
//  Created by Abdulkareem Mashabi on 13/02/1446 AH.
//

import Foundation
import WidgetKit

@objc(WidgetRefresh) class WidgetRefresh: NSObject {
  
  @objc public func refreshWidget() {
    if #available(iOS 14.0, *) {
      WidgetCenter.shared.reloadAllTimelines()
    } else {
      // Fallback on earlier versions
    }
    
    
  }

}
