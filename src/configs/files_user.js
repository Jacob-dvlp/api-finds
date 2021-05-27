const multer = require('multer');
const path = require("path");
module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "profiles")
        }, filename: function (req,file,cb) {
            const ext =  path.extname(file.originalname);
            const name = path.basename(file.originalname, ext)
            cb(null,  `${name}-${Date.now()}${ext}`)
        }
    }),
};