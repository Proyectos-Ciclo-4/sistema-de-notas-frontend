// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'sofkau-note',
    appId: '1:471437960998:web:5a91853244da843f2c03e7',
    storageBucket: 'sofkau-note.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyB8cRLwjer9ijbw0n_U3P-iGzx-WSUQk6U',
    authDomain: 'sofkau-note.firebaseapp.com',
    messagingSenderId: '471437960998',
  },
  production: false,
  baseUrl: 'https://unote-data-management.herokuapp.com',
  // baseUrl:"http://localhost:8080",
  // baseUrlWS: "ws://localhost:8081",
  baseUrlWS: "ws://unote-sockets.herokuapp.com"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
