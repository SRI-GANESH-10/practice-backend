import { body, validationResult} from 'express-validator'

import { Router } from 'express'

const router = Router()

const signInValidations = [
    body('email').isEmail().withMessage("PLease use valid email"),
    body('password').isStrongPassword(),
    body('age').isNumeric()
]

router.post('/login' , signInValidations , (req , res)=>{
    const errors = validationResult(req);

    if(!errors?.isEmpty()){
       return res.status(400).json({ errors: errors.array() });
    }
    else{
        res.send("Success...")
    }
})

export default router;