# Bring It Back
A web app that allows you (the owner of stuff) to rent said stuff hourly to other users, and communicate via in-house notification service. 

[Demo](https://bringitback-315b7.firebaseapp.com/home)

## Screenshots
![image of Bring It Back site](https://raw.githubusercontent.com/jpantana/bring-it-back/styling/screenshots/localhost_3000_home%20(1).png)

![image of Bring It Back site](https://raw.githubusercontent.com/jpantana/bring-it-back/styling/screenshots/localhost_3000_home%20(2).png)

## Installation Instructions
- Clone down this repo
- Navigate to the project root and run `npm install`
- Create a new project in [Firebase](http://www.firebase.google.com)
  - Initialize the cloned repo to the firebase project
  - Enable Google authentication in the firebase auth tab 
  - Seed the database with seed data inside of the directory, _db_ from the cloned repo
- Create a file named `/helpers/data/apiKeys.json` and add your Firebase keys using the `apiKeys.example.json` as a template
- add that file path to the .gitignore file

## How to Run
- In terminal, type `npm start`

***Note**: if you want to make a production build of this project, type `npm run build`.  This will create a folder called build with all the minified code you need.*

## How to deploy
- In your terminal, type `npm run deploy`