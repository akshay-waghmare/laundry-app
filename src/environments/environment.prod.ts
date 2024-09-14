export const environment = {
  production: true,
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
  REST_API_URL: 'http://127.0.0.1:8099/' */  
};
