import multer from 'multer'
// import path from 'path'
import CustomeErrorHandler from '../Service/CustomeErrorHandler.js'
import Joi from 'joi'
import fs from 'fs'
import product from '../Model/Product_model.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./photos")
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const handlermultipartfile = multer({ storage, limits: { fileSize: 100000 * 50 } }).single("image")

const productcontroller = {
    store(req, res, next) {
        handlermultipartfile(req, res, async (err) => {
            if (err) {
                return next(CustomeErrorHandler.servererror(err.message))
            }
            // console.log(req.file)

            const filepath = req.file.path;

            const productschema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().required(),
                size: Joi.string().required()
            })

            const { error } = productschema.validate(req.body);

            if (error) {

                fs.unlinkSync(`${AppRoot}/${filepath}`, () => {
                    return next(CustomeErrorHandler.servererror(err.message))
                })

                return next(error)
            }

            const { name, price, size } = req.body;

            let document;

            try {
                document = await product.create({
                    name, price, size, image: filepath
                })
            }
            catch (err) {
                return next(err)
            }

            res.json({ prodect_details: document });

        })
    },
    update(req, res, next) {
        handlermultipartfile(req, res, async (err) => {
            if (err) {
                return next(CustomeErrorHandler.servererror(err.message))
            }
            // console.log(req.file)

            let filepath;

            if (req.file) {
                filepath = req.file.path;
            }

            const productschema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().required(),
                size: Joi.string().required()
            })

            const { error } = productschema.validate(req.body);

            if (error) {
                if (req.file) {
                    fs.unlinkSync(`${AppRoot}/${filepath}`, () => {
                        return next(CustomeErrorHandler.servererror(err.message))
                    })
                }
                return next(error)
            }

            const { name, price, size } = req.body;

            let document;

            try {
                document = await product.findByIdAndUpdate({_id: req.params.id},{
                    name, price, size, image: filepath
                })
            }
            catch (err) {
                return next(err)
            }

            res.json({ prodect_details: document });

        })
    }
}

export default productcontroller;