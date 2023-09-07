import { app } from "./app.js";
import dotenv from 'dotenv'
import { database } from "./config/database.js";
import cloudinary from 'cloudinary'

dotenv.config({path: "./backend/config/config.env"})
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APIKEY_SECRET,
});
database()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on : http://localhost:${process.env.PORT}`)
})