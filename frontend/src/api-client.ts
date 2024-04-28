import { RegisterFormData } from "./pages/register";
import { SignInFormData } from "./pages/signIn";
import {HotelType} from "../../backend/src/model/hotel";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (FormData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(FormData)
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
}

export const signIn = async (FormData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(FormData)
    })
    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    };
    return body;
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Token invalid");
    }

    return response.json();
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST",
    });

    if (!response) {
        throw new Error("Error during sign out")
    }
};


export const addMyHotel = async (hotelFormData: FormData) =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotel`, {
        method : "POST",
        credentials : "include",
        body: hotelFormData,
    });
    if(!response.ok){
        throw new Error("failed to add hotel");
        
    };
    return response.json()
};
export const fetchMyHotels = async() :Promise<HotelType[]> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotel`, {
        credentials: "include",
    });

    if(!response.ok){
        throw new Error("Error fetching hotels");
        
    }
    return response.json()

}