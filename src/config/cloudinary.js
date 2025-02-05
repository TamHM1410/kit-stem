const cloudinary = require('cloudinary').v2
require("dotenv").config();


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUNDINARY_API_KEY,
    api_secret:process.env.CLOUNDINARY_SECRECT_KEY
}
)

module.exports=cloudinary