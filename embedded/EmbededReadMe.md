# Embeded Hardware

## Methodology:
This project uses the Arduino as an interface for the Raspberry Pi to pull data from the light sensor, as it is not supported otherwise. 
This data is transferred over GPIO as HIGH and LOW values. The Raspberry Pi counts the changes between HIGH/LOW values as part of the Python script that receives data from the app interface. 

Each position in the hangr is marked by a black marks on an otherwise white circle like this:

[![Segmented](https://etc.usf.edu/clipart/74300/74344/74344_pie_4-8b_sm.gif)](https://etc.usf.edu/clipart/74300/74344/74344_pie_4-8b_sm.gif)

Each index is saved in server-side, and the index of the target article of clothing is sent from the server to the Pi via (TODO: FIND NAME) and the Pi will move the servo until the desired position is facing the user. This position is held until a new one is sent. 

A possible improvement to this is a more accurate system of indexing, such as through the use of a rotary encoder. This was the original plan, but the hardware was not available to create this. 


## Required Hardware:
    - Raspberry Pi 3B+
    - Arduino MEGA
    - Continuous Servo with Servo Horn
    - Light Sensor
    - Misc. Connectors
    
 ## Software/IDE
 
 ### Arduino:
    - Arduino IDE 1.8.10+
    
 ### Raspberry Pi:
    - Raspbian 4.19 
    - Python 3.x.x 

