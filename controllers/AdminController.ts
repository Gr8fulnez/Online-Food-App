import { Request, Response, NextFunction } from 'express'
import{CreateVendorInput} from '../dto'
import { vendor } from '../models'
import { GeneratePassword, GenerateSalt } from '../utility'

export const CreateVendor = async (req:Request, res: Response, next: NextFunction) => {
    
    const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput>req.body
    
    const existingVendor = await vendor.findOne({ email: email })

    if (existingVendor !== null) {
        return res.json({"message": "A vendor is exists with this email ID"})
    }

    //generate a salt 
    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password, salt);

    //encrypt the password 

     const CreatedVendor = await vendor.create ({
        name: name,
        ownerName: ownerName,
        foodType: foodType,
        pincode: pincode,
        address: address,
        phone: phone,
        email: email,
        password: userPassword,
        salt: salt,
        serviceAvailable: false,
        coverImages: [],
        rating: 0,
})
    return res.json(CreatedVendor) 
}

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
    
}

export const GetVendorByID = async (req: Request, res: Response, next: NextFunction) => {
    
}