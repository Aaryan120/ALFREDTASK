const BASE_URL = process.env.REACT_APP_BASE_URL;
// console.log("PRINTING BASE URL",BASE_URL)

export const userEndPoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const flashCardPoints = {
    CREATE_CARD_API : BASE_URL + "/flashcards",
    GET_CARD_API: BASE_URL + "/flashcards",
    UPDATE_CARD_API: BASE_URL + "/flashcards/",
    DELETE_CARD_API: BASE_URL + "/flashcards/",
}