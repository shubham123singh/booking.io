import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const ImageSection = () =>{
  const {register , formState:{errors},} = useFormContext<HotelFormData>();
  return(
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col">
        <input type="file" multiple accept="image/"
        className="w-full text-gray-700"
         {...register("imageFiles" , {
          validate : (imageFiles)=>{
            const totallength = imageFiles.length;

            if(totallength === 0){
              return "At least one image should be added"
            }

            if(totallength > 6){
              return "Total image can not br greater than 6"
            }
          }
        })} />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  )
}

export default ImageSection;