const User = require('../model/user');
const userConstant = require('../constant/user');

const  userValidation  = require('../validation/user');

const router = require('express').Router();
const bcrypt = require('bcryptjs');



/**
 * @swagger
 * /api/user:
 *   post:
 *     parameters:
 *      - in: body
 *        name: user
 *        description: create new user
 *        schema:
 *          type: object
 *          properties:
 *            firstname:
 *              type: string
 *            lastname:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */

//Add User
router.post('/', async (req,res) => {

    const { email } = req.body;
    //validate the data
    const  {error}  = await userValidation(req.body);
    if( error )  
    return res.status(400).json({
         success : false,
         message :  error.details[0].message,
         resultCode: -1
     });

    //Checking if email already exists
    const emailExist = await User.findOne({email});
    console.log('em', emailExist)
    if( emailExist ) {
        return res.status(400).json({
            success : false,
            message : userConstant.USER_ALREADY_EXISTS,
            resultCode: -1
        });
    }
    
    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    //creating a new user
    const user = new User({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email ,
        password : hashPassword,
    });

    try {

        const saveUser = await user.save();
        res.json({
            success : true,
            id : user._id,
            message : userConstant.USER_SAVED
        });

    } catch (error) {
        res.status(400).send(error);
    }

});
/**
 * @swagger
 * /api/user/:
 *   get:
 *     responses:
 *       200:
 *         description: Returns the requested user
 */
router.get('/',async(req,res)=>{

    User.find()
    .then(data=>{
        if(!data)  {
            return res.status(404).json({
                 success : false,
                 message : userConstant.USER_DATA_NOT_FOUND
            });
        }
        return res.json({
           success :true,
           data 
       });
    }).catch(err=>{
        console.log(err)
        return res.status(400).json({
              success :false,
              message : err
            });
    })

});

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The user ID.
 *     description: Get a user by id
 *     responses:
 *       200:
 *         description: Returns the requested user
 */
//Get User
router.get('/:id',async(req,res)=>{

    User.findById({ _id: req.params.id})
    .then(data=>{
        if(!data)  {
            return res.status(404).json({
                 success : false,
                 message : userConstant.USER_DATA_NOT_FOUND
            });
        }
        return res.json({
           success :true,
           data 
       });
    }).catch(err=>{
        console.log(err)
        return res.status(400).json({
              success :false,
              message : err
            });
    })

});


/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The user ID.
 *      - in: body
 *        name: catchphrase
 *        description: Update user
 *        schema:
 *          type: object
 *          properties:
*            firstname:
 *              type: string
 *            lastname:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       201:
 *         description: updated
 */

//Update User
router.put('/:id',async(req,res)=>{

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    //creating a new user
    const user = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password : hashPassword,
    };

    User.updateOne({ _id: req.params.id},user)
    .then(data=>{
        if(!data)  {
            return res.status(404).json({
                 success : false,
                 message : userConstant.DATA_NOT_FOUND
            });
        }
        return res.json({
            success : true,
            message : userConstant.USER_DATA_UPDATED
        });

    }).catch(err=>{
        console.log(err)
        return res.status(400).json({
              success :false,
              message : err
            });
    })

});

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The user ID.
 *     description: Delete a user by id
 *     responses:
 *       200:
 *         description: Returns the requested user
 */

//Delete User
router.delete('/:id',(req,res)=>{

    User.findOneAndDelete({ _id: req.params.id})
    .then(data=>{
        if(!data)  {
            return res.status(404).json({
                 success : false,
                 message : userConstant.USER_DATA_NOT_FOUND
            });
        }
        return res.json({
           success :true,
           message : userConstant.USER_DATA_DELETED
       });
    }).catch(err=>{
        console.log(err)
        return res.status(400).json({
              success :false,
              message : err,
              resultCode : -1
            });
    })

});



module.exports = router;