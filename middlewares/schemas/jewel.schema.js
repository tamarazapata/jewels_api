import Joi from 'joi'


const createJewelSchema = Joi.object({
    nombre: Joi.string().required(),
    categoria: Joi.string().optional(),
    metal: Joi.string().optional(),
    precio: Joi.number().optional(),
    stock: Joi.number().optional()

})

const updateJewelSchema = Joi.object({
    nombre: Joi.string().required(),
    categoria: Joi.string().optional(),
    metal: Joi.string().optional(),
    precio: Joi.number().optional(),
    stock: Joi.number().optional()
})

export { createJewelSchema, updateJewelSchema }

