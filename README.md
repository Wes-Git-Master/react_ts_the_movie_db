# Title: The Movie Database

Project, control work on React, to create a front-end.

## Description

This project implemented:

* Header - The header displays links to other pages,
  brief information about the registered and logged-in user.
  And also a button for switching the topic on the site.
  [header.jpg](public/screenshots/Header.jpg)

######

* Home page - On the main page there is a greeting and a display of popular films.
  The explore button takes the user to the page with films.
  For cards with popular films, additional buttons for scrolling and
  scrolling with the mouse roller have been implemented.

######

[home_page.jpg](public/screenshots/Home%20Page.jpg)

######

* Page with login via TMDb - The login page has a button that redirects the user to the page for login or registration
  on TMDb with confirmation of permission to read and write data on behalf of the user.

######

* Page with all movies - The movies page displays all movies from TMDb.
  For each movie, an additional display is displayed
  star rating.
  There is also a function to search for a movie by title, a drop-down list with all available genres.
  Clicking on the movie poster will take you to the page with the selected movie.
  At the bottom of the page there are buttons for switching between pages, and there is also an additional button for
  auto scrolling the page to the top, which appears if the user has scrolled the page to the bottom and for convenience
  returns to the top of the page.

######

[movies.jpg](public/screenshots/Movie%20Page.jpg)

######

* The page with the selected movie - displays the poster, detailed information about the selected movie, and a
  description of the movie.
  The trailer of the selected movie is also displayed.
  There is also a back button that returns the user to the previous page, and an auto-scroll to the top button.

######

[selected_movie.jpg](public/screenshots/Selected%20movie%20page.jpg)

######

* Error Page - displays all errors.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right
into your project, so you have full control over them. All the commands except `eject` will still work, but they will
point to the copied scripts, so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


