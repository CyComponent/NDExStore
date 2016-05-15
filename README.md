
React Redux Scaffold
====================
A react and redux scaffold

####Contains:
- React
- Redux
- Webpack
- Babel
- ESLint
- Jest
- Sass
- Dockerfile
- Travis

Getting Started
---------------
The package.json containers blank fields specific to a project. Customize lint rules in the `eslintConfig` section. Build an app by replacing the empty container and component and add reducers and reducer actions. Install Redux and React Chrome extensions for application introspection.

Commands
--------
```
npm run dev - Run app on localhost, port 8080
npm run serve - Serve the app oover all interfaces on port 8080
npm run build - Build the app into /build/app.js
npm run clean - Remove the /build/app.js
npm run lint - Run eslint, will not cause npm to exit with an error
npm run test - Run eslint followed by jest, may cause npm to exit with an error (for travis)
npm run coverage - Run jest's coverage tool
```
