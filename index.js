//
//  index.js
//  Sahil Chaddha
//
//  Created by Sahil Chaddha on 13/08/2018.
//  Copyright © 2018 sahilchaddha.com. All rights reserved.
//

const FiberHomeAccessory = require('./src/fiberhome')

module.exports = (homebridge) => {
  var homebridgeGlobals = {
    Service: homebridge.hap.Service,
    Characteristic: homebridge.hap.Characteristic,
    Accessory: homebridge.platformAccessory,
    UUIDGen: homebridge.hap.uuid,
    Categories: homebridge.hap.Accessory.Categories,
    StreamController: homebridge.hap.StreamController,
    User: homebridge.user,
  }
  FiberHomeAccessory.globals.setHomebridge(homebridgeGlobals)
  homebridge.registerAccessory(FiberHomeAccessory.pluginName, FiberHomeAccessory.accessoryName, FiberHomeAccessory.accessory, true);
}
