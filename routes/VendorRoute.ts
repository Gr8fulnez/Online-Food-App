import express, { Request, Response, NextFunction } from 'express'
import { AddFood, GetVendorProfile, UpdateVendorProfile, UpdateVendorService, VendorLogin } from '../controllers/VendorController';
import { Authenticate } from '../middlewares';
import multer from 'multer'

const router = express.Router();

const imagesStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString()+'_'+file.originalname)
    }
})
const images = multer({storage: imagesStorage}).array('images', 10)

router.post('/login', VendorLogin)

router.use(Authenticate)
router.get('/profile', GetVendorProfile)
router.patch('/profile', UpdateVendorProfile)
router.patch('/service', UpdateVendorService)

router.post('/food', images, AddFood)
router.get('/foods')

router.get('/', (req: Request, res: Response, next: NextFunction) => {

    res.json({message: 'Hello from vendor'})
})

export {router as VendorRoute}