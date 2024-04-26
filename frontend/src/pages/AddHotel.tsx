import { useMutation } from "react-query";
import ManageHotelForm from "../form/manageHotelForm/ManageHotelForm";
import { useAppContext } from "../context/appContext";
import * as apiclient from '../api-client';

const AddHotel = () =>{
    const {showToast} = useAppContext()
    const {mutate, isLoading} = useMutation(apiclient.addMyHotel , {
        onSuccess: () =>{
            showToast({message : "Hotel Saved" , type : "Sucess"})
        },
        onError : () =>{
            showToast({message : "Error Saving Hotel" , type: "Error"})
        }
    });

    const handleSave = (hotelFormData: FormData) =>{
        mutate(hotelFormData);
    }

    return(
        <ManageHotelForm onSave={handleSave} isLoading = {isLoading}/>
    )
}
export default AddHotel;