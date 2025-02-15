import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { flashCardPoints } from "../apis";
import { setFlashCards } from "../../slices/userSlice";

const {
    CREATE_CARD_API,
    DELETE_CARD_API,
    GET_CARD_API,
    UPDATE_CARD_API,
} = flashCardPoints



export const createCard = async (question,answer,token) =>{
    let result = [];
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiconnector("POST",CREATE_CARD_API,{question:question,answer:answer},{
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        console.log("PRINTING RESPONSE AFTER CREATING CARD: ",response);
        toast.success("Card Created Successfully");
        result = response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log("CREATE CARD API ERROR: ",error);
    }
    toast.dismiss(toastId);
    return result;
}


export const getCards = async (token,dispatch) =>{
    let result = [];
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiconnector("GET",GET_CARD_API,null,{
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        console.log("PRINTING RESPONSE AFTER GETTING CARD: ",response);
        toast.success("Card Fetched Successfully");
        result = response.data;
        dispatch(setFlashCards(response.data.data));
    } catch (error) {
        toast.error(error.response.data.message);
        console.log("CREATE CARD API ERROR: ",error);
    }
    toast.dismiss(toastId);
    return result;
}

export const updateCard = async (isCorrect,id,token) =>{
    let result = [];
    const toastId = toast.loading("Loading...");
    console.log(isCorrect);
    console.log(id);
    try {
        const response = await apiconnector("PUT",UPDATE_CARD_API + `${id}`,{isCorrect:isCorrect},{
            Authorization: `Bearer ${token}`,
        },{id:id})

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        console.log("PRINT RESPONSE AFTER UPDATE CARD",response);
        toast.success("Card Updated Accordingly");
        result = response.data;
    } catch (error) {
        console.log("CARD UPDATE API ERROR : ",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}


export const deleteCard = async (id,token) =>{
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("DELETE",DELETE_CARD_API +`${id}`,null,{
            Authorization: `Bearer ${token}`,
        },{id:id})

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        console.log("PRINT RESPONSE AFTER DELETE CARD",response);
        toast.success("Card Deleted Successfully");
        result = response.data;
    } catch (error) {
        console.log("CARD DELETE API ERROR : ",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}