const Joi = require('joi');

const userValidation = data =>{

const schema = Joi.object({
    firstname:   Joi.string()
                 .alphanum()
                 .min(6)
                 .max(30)
                 .required(),

    lastname:  Joi.string()
                .alphanum()
                .min(6)
                .max(30)
                .required(),

    email:      Joi.string()
                 .email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                 .required(),

    password:  Joi.string()
                 .min(6)
                 .required(),
})
return schema.validate(data);   

}
module.exports = userValidation;
