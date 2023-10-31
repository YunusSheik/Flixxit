# Flixxit ~ _Binge exclusive content!!_

Flixxit is a streaming service that offers a wide variety of TV shows, movies, anime, documentaries and more. You can watch as much as you want, whenever you want, without a single ad. We believe there's always something new to discover, and new TV shows and movies are added every week!

## Features

- User can create a new account.
- User can log in/logout.
- User can add movies or tv shows to watchlist to watch later.
- User can search for a specific movie to watch from the database.
- User can view the movie or tv show details such as the cast and crew after logging in.
- User can subscribe to the application with different range of subscription plans to watch the content.

## Technologies used

- React for the front end.
- Nodejs/Express for the backend.
- JWT token-based authentication.
- MongoDB for the database.

## API Endpoints

- `auth/login` : for handling login functionality
- `auth/register` : for handling user registration
- `auth/forgotPassword` : to change the password
- Other API endpoints taken from TMDB website to fetch wide range of movies and tv shows.

## Deployment details

**_`Demo Link:`_** https://lovely-alpaca-f61003.netlify.app/

Front-end deployed using `netlify.com`.

Back-end deployed using `render.com`.

## How to Deploy locally on your machine?

- Download the zip file of this repo.
- Unzip it in the desired folder and run `"npm install"` using the terminals inside the app & server folders separately to install all project dependencies.
- Create a `.env` file inside the server folder with the following details,
  - `MONGO_STRING="your_mongodb_url_with_credentials"`
  - `SECRET_KEY="keep_this_key_secret_and_lengthy"`
  - `PORT=8000`
- Replace the endpoints in axios calls of API inside the app folder with http://localhost:8000 URL (_provided backend is running on 8000 port_).
- Now run `"npm start"` in both the app & server folders.

## Challenges Faced

- User authentication using JWT authentication
- Applying redux to reduce API calls
- Needed different API calls for different components.
- Since there is no unique parameter that differs the movies from tv shows in TMDB, a condition that separates the two categories is used.
- To fetch genres related to both movie and tv needed to fetch from two api's and append them into a single object in redux store.

## Future plans

- Applying redux to reduce API calls.
- Improve user interface and make it responsive for mobile view.
- Adding funcitonality for admin users to be able to upload movies or documentaries which can be shared with their user groups.
- Adding dashboard for admins to monitor the streaming details of users group.

## Packages used

### Front-end

- npx create-react-app app
- npm install react-router-dom
- npm install axios
- npm install react-redux
- npm install @reduxjs/toolkit
- npm install @mui/material

### Back-end

- npm init
- npm install express
- npm install mongoose
- npm install nodemon
- npm install dotenv
- npm install jsonwebtoken
- npm install cors
- npm install express-router
- npm install crypto-js
