# Globe Journal

Welcome to Globe Journal 🌍

An interactive 3D globe application enabling users to visualise on the globe which countries they have visited worldwide. This is a POC and not a completed application with known bugs and errors. Take no notice of the google sign in, this is a future
feature which is still in-progress.

## Work In Progress 👨🏻‍💻

- ☑️ -99 country code: Countries like France are being pulled in with the country code -99 which makes these countries broken on the map, when you select one of the countries with this code; all are applied as 'visited'
- ☑️ PrimeReact: multi-select component doesn't update when countries are selected manually on map click
- ☑️ Social oAuth: We've started to implement authentication with google; to promote the ability to share maps with other users. No DB currently exists hence why this has been put on hold.

## Framework Considerations

- This is a first attempt at using typescript with react, however due to application simplicity I'd like to note that next time just using regular JavaScript and JSX would have been more appropriate,
  the gains from typescript were not worth the additional effort to create types, interfaces, and typed NPM modules.

- This application uses react-globe-gl (https://github.com/vasturiano/react-globe.gl) which is a wrapper library for three.js and my first time ever using three.js. This was a super helpful package and would definitely use it again.
