// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_base: 'http://localhost:3000/api',
  mock_mode: false,
  redirect_after_account_create: 'http://localhost:4200/get-started',
  redirect_after_get_started_workergroup: 'http://localhost:4200/setup-payout',
  redirect_after_account_login: 'http://localhost:4200',
  redirect_after_account_logout: 'http://localhost:4200/login',

  // Production usage
  fileupload_url: 'https://api.bitcoinfiles.org/upload',
  fileupload_api_base: 'https://api.bitcoinfiles.org',
  filepreview_base_url: 'https://media.bitcoinfiles.org',
  website_base_url: 'http://localhost:4200', // Use local machine to test pages even though server is Prod

  // Localhost: (When running BitcoinFiles-Server API locally)
  // fileupload_url: 'http://localhost:8000/upload',
  // fileupload_api_base: 'http://localhost:8000',
  // filepreview_base_url: 'http://localhost:8000',
  // website_base_url: 'http://localhost:4200',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
