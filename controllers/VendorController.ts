import { Request, Response, NextFunction } from 'express'
import { VendorLoginInputs } from '../dto'
import { FindVendor } from './AdminController';
import { GenerateSignature, validatePassword } from '../utility';

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

}

export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

}

export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction) => {

}


