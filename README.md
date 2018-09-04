# homebridge-fiberhome-config

## Description :

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
        }
    ]
}
```