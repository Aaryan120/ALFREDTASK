import { userEndPoints } from "../apis";
import { apiconnector } from "../apiconnector";
import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/userSlice";


const {
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    SENDOTP_API,
    SIGNUP_API
} = userEndPoints 


export function sendOtp(email,navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiconnector("POST",SENDOTP_API,{
                email,
            })

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully");
            navigate("/verify-email")
        } catch (error) {
            console.log("SENDOTP API ERROR",error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signUp(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiconnector("POST",SIGNUP_API,{
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Signup Successful");
            navigate("/login");
        } catch (error) {
            console.log("SIGN UP API ERROR", error);
            toast.error(error.response.data.message);
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(
    data,
    navigate
){
    return async (dispatch) =>{
        const toastId = toast.loading("LOADING...");
        // console.log("PRINTING DATA",data);
        dispatch(setLoading(true));
        try {
            const response = await apiconnector("POST",LOGIN_API,data);
            // console.log("PRINTING RESPONSE",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            console.log("PRINTING RESPONSE: ",response);
            toast.success("Login Successful");
            dispatch(setToken(response.data.data.token));
            const userImage = response.data?.data?.imageUrl ? 
            response.data.data.imageUrl : 
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            const updatedUser = {...response.data.data, imageUrl:userImage};
            dispatch(setUser({...response.data.data,image:userImage}))
            dispatch(setUser(updatedUser));
            localStorage.setItem("token",JSON.stringify(response.data.data.token));
            localStorage.setItem("user",JSON.stringify(updatedUser));

            navigate("/flashcard")
        } catch (error) {
            console.log("LOGIN API ERROR" ,error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate){
    return (dispatch) =>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        // dispatch(resetCart())
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        toast.success("Logged Out");
        navigate("/");
    }
}


export function getResetPasswordToken(
    email,
    setEmailSent
) {

    return async (dispatch) =>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))
        try {
            const response = await apiconnector("POST",RESETPASSTOKEN_API,{email});

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);
        } catch (error) {
            console.log("RESET PASS TOKEN Error",error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function resetPassword(password,confirmPassword,token){
    return async(dispatch) =>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiconnector("POST",RESETPASSWORD_API,{
                password,confirmPassword,token
            })

            
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset successfully");
        } catch (error) {
            console.log("RESET PASSWORD TOKEN error", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
