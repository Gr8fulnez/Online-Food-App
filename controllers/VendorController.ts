import { Request, Response, NextFunction } from 'express'
import { VendorLoginInputs } from '../dto'
import { FindVendor } from './AdminController';
import { validatePassword } from '../utility';

export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = <VendorLoginInputs>req.body;

    const existingVendor = await FindVendor('', email);

    if (existingVendor !== null) {
        
        //validation and give access
        const validation = await validatePassword(password, existingVendor.password, existingVendor.salt);

        if (validation) {
            
            return res.json(existingVendor)

        } else {
            return res.json({ "message": "Password is not valid" })
        }
    }

    return res.json({"message": "Login credential not valid"})

}