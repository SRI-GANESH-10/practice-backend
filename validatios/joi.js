import Joi from "joi";
import { Router } from "express";

const router = Router();
const userSchema = Joi.object({
    name:Joi.string().alphanum().min(3).max(15).required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().custom((val , help)=>{
        if(val.toLowerCase() === 'password'){
            return help.message("Password should not be password you bull shit guy")
        }
        return val
    }),
    list:Joi.array().items(Joi.string().lowercase()).min(1),
    method: Joi.string().valid('email' , 'phone').required(),
    email:Joi.string().when('method' , {
        is:"email",
        then:Joi.required(),
        otherwise:Joi.optional()    
    })
})

router.post('/post' , (req , res)=>{
    const { error , validate} = userSchema.validate(req.body);
    if(error){
        res.status(400).json({
            message:error?.message
        })
    }
    else{
        res.json({
            data:req.body
        })
    }
})

export default router;

