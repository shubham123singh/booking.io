import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/appContext";


const SignOutButton = () =>{
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();
    const Mutation  = useMutation(apiClient.signOut, {
        onSuccess : async () =>{
            await queryClient.invalidateQueries("validateToken")
            showToast({ message: "Signed out", type: "Sucess" })
        }, 
        onError : (error : Error) =>{
            showToast({message: error.message, type: "Error"})
        }
    });

    const handleClick = () =>{
        Mutation.mutate();
    }
    return(
        <button onClick={handleClick} className="text-blue-600 font-bold bg-white hover:bg-gray-100">Sign out</button>
    )
}

export default SignOutButton