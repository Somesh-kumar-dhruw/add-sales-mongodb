##### How to run this app?

- To run this web app, follow these steps:

1. Run npm install in both the frontend and backend folders.
2. Start the backend server with node server.js.
3. Start the frontend with npm start.
4. Access the app at localhost:3000.

##### Folder Structure

1. Backend(folder) : The backend part of the web-app.
2. Frontend(folder) : The frontend part of the web-app.

##### Backend Structure

#### Models folder

1. Contains two models: user_model.js and sales_entry_model.js.

#### Routes folder

1. The Routes folder has three route folder : file_route.js, sales_entry_route.js and user_route.js.

## file_route.js folder

**Handles profile image upload and retrieval.**

- `post - /uploadFile`- This function is used to upload profileImg from database

- `get - /:fileName`- This function is used to get profileImg from database

## sales_entry_route.js

**Manages sales entries.**

- `get - /showmyentry`- This function is used to show entires from particular user.

- `get - /totalavenue`- This function is used to show todays total avenue from particular user.

- `post - /entrysales`- This function is used to save entries in database.

## user_route.js

**Handles user-related routes.**

- `post - /registration`- This function is used to register user in database.

- `post - /login`- This function is used to check that login user is present in database.

- `put - /updateUser`- This function is used to undate particular user info like firstName, lastName, password, profileImg.

- `get - /profileImg`- This function is used to retrieving user profile Image for user based on userId.

#### Middleware folder

### protectedResource.js

1. Contains JWT Token authentication logic.
2. Verifies JWT tokens in incoming requests for user authentication.
3. Attaches user information to the request for authorized requests.

#### Config js folder -- config.js

1. Stores connection modules:
   **`MONGODB_URL:` MongoDB connection URL.**
   **`JWT_SECRET:` JSON Web Token (JWT) secret key.**

##### Frontend Structure

#### components folder

1. Contains navbar.js for the site header.

#### pages folder

1. Includes pages such as `AddSales.js`, `Home.js`, `Login.js`, `Registration.js`, `TodayRevenue.js`, `TopSales.js`, and `UserInfo.js`.
2. Each page corresponds to its name, with `UserInfo.js `specifically used for updating user information.

#### Controller Folder Separation

1. Components are structured in a controller folder to manage functionalities efficiently.

### action folder

## actionReducer.js file

1. Defines `LOGIN_SUCCESS` and `LOGIN_ERROR` actions typically used in Redux for authentication state management.

### redux folder

## combineReducer.js file

1. Sets up a rootReducer by combining multiple reducers into a single reducer object, enabling comprehensive state management.

## store.js file

1. Initializes a Redux store using the `createStore` function, associating it with the rootReducer for state management.

## userReducer.js file

1. Manages the 'user' state in Redux, including a profile image URL.
2. Handles actions for successful login and login errors, updating the state accordingly.

#### Functionality of the App:

1. The web app provides user registration and login functionality.
2. Users can add sales entries, view their entries, and calculate today's total avenue.
3. User profiles can be updated, including first name, last name, password, and profile image.
4. The app utilizes JWT Token authentication for user security.
5. Profile images can be uploaded and retrieved from the database.
6. Redux is used for state management, including handling authentication and user-related data.
