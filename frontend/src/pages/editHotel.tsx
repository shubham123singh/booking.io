import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from '../api-client'
import ManageHotelForm from "../form/manageHotelForm/ManageHotelForm";
import { useAppContext } from "../context/appContext";

const EditHotel = () =>{
    const {hotelId} = useParams();
    const{showToast} = useAppContext();
    const{data:hotel} = useQuery("fetchMyHotelById" , () => apiClient.fetchMyHotelById(hotelId || ""),{
        enabled : !!hotelId,
    });
    const {mutate, isLoading} = useMutation(apiClient.updateHotelById, {
        onSuccess: () =>{
            showToast({message : "Hotel Updated" , type : "Sucess"})
        },
        onError : () =>{
            showToast({message : "Hotel not update" , type : "Error"})
        },
    
    })
    const handleSave = (hotelFormData : FormData) =>{
        mutate(hotelFormData)
    }
    return(
        <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
    )
}
export default EditHotel;