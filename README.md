# homebridge-fiberhome-config

## Description :

Due to lack of DHCP Reservation / Static IP Reservation & enforced AP Isolation on FiberHome Router, it makes homebridge setup for HomeAutomation unstable. After Device reset, FiberHome router assigns the device a new IP Address. 

This Plugin tends to fetch newly assigned IP Address from FiberHome Router and updates homebridge configuration to point devices to their correct IP addresses. It uses MAC Address of the device to map HomeKit devices to IP.

![Router Top](https://github.com/sahilchaddha/homebridge-fiberhome-config/raw/master/img/router-top.png "Router Top")

![Router Bottom](https://github.com/sahilchaddha/homebridge-fiberhome-config/raw/master/img/router-bottom.png "Router Bottom")

## Installation : 

```shell
    $ npm install -g homebridge-fiberhome-config
```

## Usage :

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