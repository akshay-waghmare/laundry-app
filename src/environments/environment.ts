// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ws: {
    brokerURL: 'wss://bet.victoryline.live/ws/websocket',  // Secure WebSocket URL via Nginx proxy
    login: 'guest',
    passcode: 'guest'
  },
  apiUrl: 'https://bet.victoryline.live/api',  // Secure API URL via Nginx proxy
  REST_API_URL: 'https://bet.victoryline.live/api/',  // Same secure API URL
  REST_API_SCRAPING_URL: 'https://bet.victoryline.live/'  

   /* ws: {
    brokerURL: 'ws://127.0.0.1:8099/ws/websocket',
    login: 'guest',
    passcode: 'guest'
  },
  apiUrl: 'http://127.0.0.1:8099',
  REST_API_URL: 'http://127.0.0.1:8099/',
  REST_API_SCRAPING_URL: 'http://127.0.0.1:5000/' */
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
