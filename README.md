# homebridge-fiberhome-config

## Description :

Due to lack of DHCP Reservation / Static IP Reservation & enforced AP Isolation on FiberHome Router, it makes homebridge setup for HomeAutomation unstable. After Device reset, FiberHome router assigns the device a new IP Address. 

This Plugin tends to fetch newly assigned IP Address from FiberHome Router and updates homebridge configuration to point devices to their correct IP addresses. It uses MAC Address of the device to map HomeKit devices to IP.

<p float="left">
  <img src="https://github.com/sahilchaddha/homebridge-fiberhome-config/raw/master/img/router-top.png" width="400" /> 
  <img src="https://github.com/sahilchaddha/homebridge-fiberhome-config/raw/master/img/router-bottom.jpg" width="400" />
</p>

## Installation : 

```shell
    $ npm install -g homebridge-fiberhome-config
```

## Usage :

This Plugin creates a switch in HomeKit which is accessible from Home App. You can toggle it and set it on repeat to toggle the switch every x minutes.
When Toggled, the switch will fetch all the clients mentioned in `config.json` e.g. `"_Sahil_iPhone": "xx:xx:xx:xx:xx:xx"` and will update config.json for homebridge wherever the variable `FB_Sahil_iPhone` (FB + {VAR_NAME}) is assigned and needs to be constantly updated. The config.json needs to be copied to `$HOMEBRIDGE_HOME/config-fiberhome.json` for backup purposes.

## Sample Config : 

```json
{
    "accessories": [
        {
            "accessory": "FiberHome",
            "name": "FiberHome-Network-Updater",
            "routerGateway": "192.168.1.1",
           "macs": {
                "_Sahil_iPhone": "xx:xx:xx:xx:xx:xx",
                "_KitchenLED": "xx:xx:xx:xx:xx:xx",
                "_TVLED": "xx:xx:xx:xx:xx:xx",
                "_LoungeLED": "xx:xx:xx:xx:xx:xx"
            }
        },
        {
            "accessory": "MagicHome",
            "name": "Kitchen LED",
            "ip": "FB_KitchenLED"
        },
        {
            "accessory": "MagicHome",
            "name": "TV LED",
            "ip": "FB_TVLED"
        },
        {
            "accessory": "MagicHome",
            "name": "Sofa LED",
            "ip": "FB_LoungeLED"
        },
         {
            "accessory": "PeoplePlus",
            "name": "Sahil's iPhone",
            "ip": "FB_Sahil_iPhone"
        }
    ]
}
```
