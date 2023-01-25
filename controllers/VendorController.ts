import { Request, Response, NextFunction } from 'express'
import { EditVendorInput, VendorLoginInputs } from '../dto'
import { FindVendor } from './AdminController';
import { GenerateSignature, validatePassword } from '../utility';
import { CreateFoodInput } from '../dto/Food.dto';
import { Food } from '../models';

export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = <VendorLoginInputs>req.body;

    const existingVendor = await FindVendor('', email);

    if (existingVendor !== null) {
        
        //validation and give access
        const validation = await validatePassword(password, existingVendor.password, existingVendor.salt);

        if (validation) {
            
            const signature = GenerateSignature({
                _id: existingVendor.id,
                email: existingVendor.email,
                foodTypes: existingVendor.foodType,
                name: existingVendor.name
            })
            return res.json(signature)

        } else {
            return res.json({ "message": "Password is not valid" })
        }
    }

    return res.json({"message": "Login credential not valid"})
}


export const GetVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (user) {
        
        const existingVendor = await FindVendor(user._id)

        return res.json(existingVendor)
    }

    return res.json({ "message": "vendor information Not found" })
    
}

export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const { foodTypes, name, address, phone } = <EditVendorInput>req.body
    
    const user = req.user;

    if (user) {
        
        const existingVendor = await FindVendor(user._id)

        if (existingVendor !== null) {
            
            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phone = phone;
            existingVendor.foodType = foodTypes;
            
            const savedResult = await existingVendor.save()
            return res.json(savedResult)
        }
        return res.json(existingVendor)
    }

    return res.json({ "message": "vendor information Not found" })
    
}

export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (user) {
        
        const existingVendor = await FindVendor(user._id)

        if (existingVendor !== null) {
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
            const savedResult = await existingVendor.save()
            return res.json(savedResult)
        }
        return res.json(existingVendor)
    }

    return res.json({ "message": "vendor information Not found" })
    
}

export const AddFood = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (user) {

        const { name, description, category, foodType, readyTime, price } = <CreateFoodInput>req.body

        const vendor = await FindVendor(user._id)

        if (vendor !== null) {
            
            const createdFood = await Food.create({
                vendorId: vendor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                readyTime: readyTime,
                price: price,
                rating: 0,
                images: ['mock.jpg']
            })
            vendor.foods.push(createdFood);
            const result = await vendor.save()

            return res.json(result)
        }

    }

    return res.json({ "message": "something went wrong with add food" })
    
}
    export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (user) {
        
        const existingVendor = await FindVendor(user._id)

        if (existingVendor !== null) {
           
        }
        return res.json(existingVendor)
    }

    return res.json({ "message": "Foods information not found" })
    
}


