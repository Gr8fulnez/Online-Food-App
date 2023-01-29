import { Request, Response, NextFunction } from 'express'
import{CreateVendorInput} from '../dto'
import { vendor } from '../models'
import { GeneratePassword, GenerateSalt } from '../utility'

export const FindVendor = async (id: string | undefined, email?: string) => {
    
    if (email) {
        return await vendor.findOne({email: email})
    } else {
        return await vendor.findById(id)
    }
}

export const CreateVendor = async (req:Request, res: Response, next: NextFunction) => {
    
    const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput>req.body
    
    const existingVendor = await FindVendor('', email);

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
        foods: []
})
    return res.json(CreatedVendor) 
}

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
    const vendors = await vendor.find()
    
    if (vendors !== null) {
        return res.json(vendors)
    }

    return res.json({"message": "vendors data not available"}) 
}

export const GetVendorByID = async (req: Request, res: Response, next: NextFunction) => {
   
    const vendorId = req.params.id;

    const vendorById = await FindVendor(vendorId)

    if(vendorById !== null){
        return res.json(vendorById)
    }

    return res.json({"message": "vendor data not available"}) 

}