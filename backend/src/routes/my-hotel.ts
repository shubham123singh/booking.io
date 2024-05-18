import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../model/hotel";
import { HotelType } from "../shared/shared";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 5 * 1024 * 1024   // 6mb
    }
});

router.post("/", verifyToken,
    [
        body("name").notEmpty().withMessage("name is required"),
        body("city").notEmpty().withMessage("city is required"),
        body("country").notEmpty().withMessage("country is required"),
        body("description").notEmpty().withMessage("description is required"),
        body("type").notEmpty().withMessage("hotel type is required"),
        body("pricePerNight").notEmpty().isNumeric().withMessage("pricePerNight is and must be a number"),
        body("facilities").notEmpty().isArray().withMessage("facilities is required"),
    ], upload.array("imageFiles", 5), async (req: Request, res: Response) => {

        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;

            // upload the image to cloudinary

            const imageUrls = await uploadImages(imageFiles);
            newHotel.imageUrls = imageUrls;
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId;


            // if the upload are sucessfull, add urls to database

            const hotel = new Hotel(newHotel);
            await hotel.save();

            // return a 201 status
            res.status(201).send(hotel);
        } catch (error) {
            console.log("Error creating hotel: ", error);
            res.status(500).json({ message: "something went wrong" })
        }
    }
);


router.get("/", verifyToken, async(req:Request, res:Response) =>{
    try {
        const hotels = await Hotel.find({userId : req.userId});
        res.json(hotels);
        
    } catch (error) {
        res.status(500).json({message : "error fetching hotel"})
    }
});

router.get("/:id" , verifyToken, async(req : Request, res: Response) =>{
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne({
            _id : id,
            userId : req.userId,
        });
        res.json(hotel);
        
    } catch (error) {
        res.status(500).json({messgae: "Error fetching hotel by id"})
    }
});

router.put("/:hotelId" , verifyToken, upload.array("imageFiles"), async(req:Request , res:Response) =>{
    try {
        const updatedHotel : HotelType = req.body;
        updatedHotel.lastUpdated = new Date();
        const hotel = await Hotel.findOneAndUpdate({
            _id : req.params.hotelId,
            userId : req.userId,
        }, updatedHotel, {new: true});
        if(!hotel){
            return res.status(404).json({message:"Hotel not found"});
        };

        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);

        hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

        await hotel.save();
        res.status(201).json(hotel);

    } catch (error) {
        res.status(500).json({message : "something went wrong"})
    }
})



async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromise = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromise);
    return imageUrls;
};


export default router;
