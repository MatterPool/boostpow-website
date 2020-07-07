# Boost Websiet
Front end of boostpow.com

## Running Locally

`npm install`

`npm start`

## Building

`npm run build` produces a `dist/` folder containing the entire application.

## Run Locally

The `environment.ts` file controls the URL endpoints of the backend servers. Point it to your localhost hots

## Production Deploy

`https://console.firebase.google.com/u/0/project/boowpow-website/hosting`

`npm install -g firebase-tools`

`firebase login`

`firebase init`


Once your firebase environment is setup, it's as easy as `firebase deploy` to push code.

### Setting up the Environment Variables
The deployment process is still a work in progress. Right now a few changes are needed:
todo: make a different `npm` script for dev vs prod

#### Updating Environment Variables
File: **src/.env.js**

## License
Private Use Only
Copyright 2020 MatterPool Inc.
