# Hangr

Hangr is an application that allows you to catalog all of the clothes you own and have them be intelligently recommended to you based on the weather, the time since it was last worn, and how often it is combined with other articles of clothing.  After you confirm your selected outfit it then activates a mechanical carousel which presents you with that very outfit.


## How we built it
Hangr was built in three different parts all working together.

1) **Backend**
The backend was written in TypeScript on a Node.js server.  Each API endpoint was hosted as a separate Azure serverless function with some shared libraries to support each of the functions.  For data storage, we used an Azure Postgresql instance and for blob image storage we used Firebase storage.  Furthermore, we used the machine learning ClarifAi API in order to determine the type of clothing it was from just the picture.  This allowed us to know what kind of weather that piece of clothing would be best for.  We would then combine that as well as our other recommendation methods into one compatibility score that helped us choose what items to recommend.

2) **Mobile App**
Our mobile app was built on React-Native and the Ignite toolkit. The app is capable of running on both iOS and Android, we primary built for the Android platform. It makes use of the phones built-in camera to photograph and catalog images before sending them off to the server for processing.

3) **Embedded Hardware**
The mechanical carousel is powered by a  Raspberry Pi, which uses the Requests library to send a get request to the backend for the index of the desired clothing item. The item is indexed and presented using a combination of a continuous servo and light sensor. We initially create a mechanical rotary encoder for indexing, but the pressure placed on the servo caused it to stall, so we created an electronic-based rotary encoder with a brushing mechanism. However, due to limited resources, this attempt was made with a combination of aluminum foil, hot glue, and cardboard and was ultimately unsuccessful. However, with the addition of a light sensor hooked up to an Arduino Mega, we decided to determine indices programmatically

