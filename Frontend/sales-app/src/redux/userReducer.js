// Define an initial state for the 'user' part of the Redux store.
const initialState = {
    user: {},
    profileImgUrl: "", // Add a new property for the profile image URL
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload,
                profileImgUrl: action.payload.profileImg, // Update profileImgUrl
            };
        case "LOGIN_ERROR":
            return {
                ...initialState, // Reset both user and profileImgUrl
            };
        default:
            return state;
    }
}
