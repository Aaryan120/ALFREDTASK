import { createSlice } from "@reduxjs/toolkit"; 


const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    flashCards: localStorage.getItem("card") ? JSON.parse(localStorage.getItem("card")) : [],
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser: (state,action) =>{
            state.user = action.payload;
        },
        setFlashCards:(state,action) =>{
            state.flashCards = action.payload;
        },
        updateFlashCard:(state,action) =>{
            state.flashCards = state.flashCards.filter(card => card._id !== action.payload);
        }
    }
})


export const {
    setUser,
    setFlashCards,
    updateFlashCard
} = userSlice.actions;

export default userSlice.reducer;