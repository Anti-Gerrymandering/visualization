# Visualizing Gerrymandering


This is a project started March 25th 2017 for [Code for Philly](https://codeforphilly.org/)'s Civic Engagement Launchpad

The project structure is layed out as following:
- config
- public
- scripts
- src
  - actions
  - components
  - reducers
  - sass //All Sass files must be imported into App.sass to be generated
  - index.js
- test

## API Tokens

In the actions folder, you will find tokens.example.js. You should re-save this file as token.js. Then you should generate the appropriate tokens for the website with it.

The *.gitignore* has been configured to ignore the __tokens.js__, please for your own security do not commit any tokens in the __tokens.example.js__! It is strictly an example and all files will import off the __tokens.js__ anyway.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

Testing Travis
