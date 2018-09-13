//
//  fiberhome.js
//  Sahil Chaddha
//
//  Created by Sahil Chaddha on 04/09/2018.
//  Copyright © 2018 sahilchaddha.com. All rights reserved.
//

const RouterMapper = require('fiberhome-network-mapper').default
const cp = require('child_process')
const path = require('path')
const fs = require('fs')
const Accessory = require('./accessory')

const cachedAddressFileName = 'fiberhome-cached-macs.json'
const fiberhomeConfig = 'config-fiberhome.json'
const pluginName = 'homebridge-fiberhome-config'
const accessoryName = 'FiberHome'
var homebridge

function FiberHomeGlobals() {

}

FiberHomeGlobals.setHomebridge = (homebridgeRef) => {
  homebridge = homebridgeRef
}

class FiberHome extends Accessory {
  constructor(log, config = {}) {
    super(log, config, homebridge)
    this.routerGateway = config.routerGateway || '192.168.1.1'
    this.macs = config.macs || {}
    this.router = new RouterMapper('http://' + this.routerGateway)
    this.config = config
    this.paths = {
      config: homebridge.User.configPath(),
      cachedAddress: path.join(homebridge.User.storagePath(), cachedAddressFileName),
      fiberhomeConfig: path.join(homebridge.User.storagePath(), fiberhomeConfig),
    }
  }

  getModelName() {
    return 'FIBERHOME-CONFIG-ACCESSORY'
  }

  getSerialNumber() {
    return '001-FIBERHOME'
  }

  getAccessoryServices() {
    const switchService = new homebridge.Service.Switch(this.config.name)
    switchService
      .getCharacteristic(this.homebridge.Characteristic.On)
      .on('get', this.getState.bind(this))
      .on('set', this.switchStateChanged.bind(this))
    return [switchService]
  }

  getState(callback) {
    callback(null, false)
  }

  switchStateChanged(newState, callback) {
    this.log('Fetching New Clients')
    const self = this
    callback()
    self.router.getLANClients()
      .then((res) => {
        var macIp = {}
        res.forEach((item) => {
          macIp[item.macAddress] = item.ipAddress
        })
        return macIp
      })
      .then((newAddress) => {
        // Get Cached Address
        if (self.config.disableCache === true) {
          return newAddress
        }

        return self.getCachedAddress()
          .then((cachedAddress) => {
            var updatedAddress = cachedAddress
            const newAddressArray = Object.keys(newAddress)
            newAddressArray.forEach((item) => {
              updatedAddress[item] = newAddress[item]
            })
            return updatedAddress
          })
      })
      .then((updatedAddress) => {
        // Save New Address
        return self.writeFile(JSON.stringify(updatedAddress), self.paths.cachedAddress)
          .then(() => {
            return updatedAddress
          })
      })
      .then((updatedAddress) => {
        // Map Address to Config
        const devices = Object.keys(self.macs)
        var newMacs = {}
        devices.forEach((item) => {
          const macID = self.macs[item]
          newMacs[item] = updatedAddress[macID]
        })
        return newMacs
      })
      .then((newConfig) => {
        // Updating Homebridge Config
        const keys = Object.keys(newConfig)
        return self.getFile(self.paths.fiberhomeConfig)
          .then((config) => {
            var modifiedConfig = config
            keys.forEach((item) => {
              if (!newConfig[item]) {
                modifiedConfig = modifiedConfig.replace(new RegExp('FB' + item, 'g'), '192.168.1.254')
                return
              }
              modifiedConfig = modifiedConfig.replace(new RegExp('FB' + item, 'g'), newConfig[item])
            })
            return modifiedConfig
          })
      })
      .then((newConfig) => {
        // Save New Config
        return this.writeFile(newConfig, this.paths.config)
      })
      .then(() => {
        // Restarting Homebridge
        return self.restartHomebridge()
      })
      .catch((err) => {
        self.log(err)
      })
  }

  getCachedAddress() {
    return this.getFile(this.paths.cachedAddress)
      .then((data) => {
        return JSON.parse(data)
      })
      .catch(() => {
        return {}
      })
  }

  getFile(src) {
    return new Promise((resolve, reject) => {
      fs.readFile(src, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }

  writeFile(data, dest) {
    return new Promise((resolve, reject) => {
      fs.writeFile(dest, data, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }

  restartHomebridge() {
    return new Promise((resolve) => {
      const killCommand = cp.spawn('killall', ['-9', 'homebridge'], { detached: false, stdio: 'ignore' })
      killCommand.on('close', () => {
        resolve()
      })
    })
  }
}

module.exports = {
  accessory: FiberHome,
  globals: FiberHomeGlobals,
  pluginName: pluginName,
  accessoryName: accessoryName,
}
