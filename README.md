# DevConnector - MERN stack app

The app is live here -> https://dev-connectme.herokuapp.com

## Summary

A social media app for developers, where users can sign up, create a dev profile and add their 
work experience, education, profile details. Users can also link their profile to GitHub so that
their latest 5 repos will be displayed under their details. List of all devs is available for browsing
and checking their profiles, users can also create posts, like/dislike and comment on them.

#### Client

Built with React using functional approach with hooks and async/await ES6 syntax. For state management
is used Redux with [redux-thunk](https://github.com/reduxjs/redux-thunk) middleware to allow
handling api calls and side effects.

#### Back-end

RESTful service built with Express & MongoDB, stateless authentication with [JWT](https://jwt.io/)

For the API Endpoints Check -> 
[API Documentation](https://documenter.getpostman.com/view/15486017/UV5deaaD) in Postman

#### NOTE: Since the app is deployed on Heroku's free tiers it may take longer to load up initially, but will be fine afterwards

## Screenshots

[> Open Gallery <](https://drive.google.com/drive/folders/1kGtixmoKKr4gefOxbsz5Qu0guCD58Wzn?usp=sharing)

## Installation & Pre-requisites

To be able to run this project on your local system, you need the following:

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.17.5

    $ npm --version
    8.1.1


## Installation

####To install and run the app locally download the source code or clone the repository.

`git clone https://github.com/metodievmartin/devconnector-mern-app.git`

Open the project and cd into the root folder.

`cd devconnector-mern-app`

Install all the dependencies:

`npm install`

####*The server requires some extra configuration in order to run properly on your local machine:
Create a `config.env` file in the project's root directory (topmost level)

In `config.env` declare the following env variables:
```
MONGO_URI={here goes the connection uri to your mongo db}
JWT_SECRET={here goes your jwt secret token}
GITHUB_TOKEN={here goes your github token needed by the github api}
```
Example
```
MONGO_URI=mongodb+srv://myusername123:mypass123@mycluster.qwerty.mongodb.net/myDatabase?retryWrites=true&w=majority
JWT_SECRET=my-super-secret-jwt-key
GITHUB_TOKEN=ghp_jrgrJFDU878efsfe8fsef8fsf8sffefFEFE
```

Now it's all set... run any of the commands to start the respective app:

 - `npm start` - to start the server

 - `npm run server` - to run the server in dev mode with nodemon

 - `npm run client` - to start the client in dev mode

 - `npm run dev` - will start both the client and the server concurrently in dev mode

By default, the client runs on `http://localhost:3000/` and the server on `http://localhost:5000/`

The app will load the development server and will automatically reload if you change any of the source files.