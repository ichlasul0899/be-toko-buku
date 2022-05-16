const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/authController')
const BookController = require('../controllers/bookController')
const multer  = require('multer')
const path = require('node:path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'))
    },
    filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
    }
});

const multi_upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).array('uploadedImages', 2)

router.get('/', (req, res) => {
    res.send('Hello World! Created By Ichlas')
})

router.post('/login', AuthController.login)

router.post('/register', AuthController.register)

router.post('/book', multi_upload ,BookController.createBook)

router.get('/products', BookController.books)


module.exports = router;