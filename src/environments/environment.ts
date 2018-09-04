// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  configFile: 'assets/config/config.dev.json',
  firebase: {
    apiKey: "AIzaSyD_4J44QIoYmwIQN5GegB-JNEeGBKI-dR4",
    authDomain: "productos-f1cb0.firebaseapp.com",
    databaseURL: "https://productos-f1cb0.firebaseio.com",
    projectId: "productos-f1cb0",
    storageBucket: "productos-f1cb0.appspot.com",
    messagingSenderId: "334222517669"
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
