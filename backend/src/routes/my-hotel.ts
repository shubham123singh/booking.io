import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../model/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 6 * 1024 * 1024   // 6mb
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
    ], upload.array("imageFiles", 6), async (req: Request, res: Response) => {

        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;

            // upload the image to cloudinary

            const uploadPromise = imageFiles.map(async (image) => {
                const b64 = Buffer.from(image.buffer).toString("base64");
                let dataURI = "data:" + image.mimetype + ";base64," + b64;
                const res = await cloudinary.v2.uploader.upload(dataURI);
                return res.url;
            });

            const imageUrls = await Promise.all(uploadPromise);
            newHotel.imageUrls = imageUrls;
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId;


            // if the upload are sucessfull, add urls to database

            const hotel = new Hotel(newHotel);
            await hotel.save();

            // return a 201 status
            res.status(201).send(hotel);
        } catch (error) {
            console.log("Eroor creating hotel: ", error);
            res.status(500).json({ message: "something went wrong" })
        }
    }
);


export default router;