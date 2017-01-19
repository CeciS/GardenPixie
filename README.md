#GardenPixie
*v0.0.1beta*
*A simple garden helper*

I have always loved plants but the problem is that I ussually forget to water them daily. So I wanted something to remind me of that, except on rainy days.

**Important**
You will need to include a file named *config.js* inside the *js* folder.
This file must contain 3 *string* global variables with the following format:
	var apiKey = (get the API key at https://darksky.net/dev/)
	var cityName = [cityName], [stateName]
	var currentLocation = [latitude],[longitude] (no whitespaces)

TO DO:

- auto detect current location to fetch weather data
- convert to apk
- allow custom location and reminder hour settings
- add according weather icons

Resources:
Dark Sky weather API