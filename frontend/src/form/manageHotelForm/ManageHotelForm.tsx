import { useForm } from "react-hook-form";

export type HotelFormData = {
    name :string;
    city: string;
    country: string;
    description : string;
    type : string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles : FileList;
    adultCount : number;
    childCount : number;
}

const ManageHotelForm = () =>{
    const formMethod = useForm<HotelFormData>();
    return<form>

    </form>
}

export default ManageHotelForm