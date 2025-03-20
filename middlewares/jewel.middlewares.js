import { postById } from "../src/models/jewel.models.js"
import { createJewelSchema, updateJewelSchema } from "./schemas/jewel.schema.js"

const createJewelMiddleware = async (req, res, next) => {
    const { error } = createJewelSchema.validate(req.body)
    if (error) {
    res.status(400).json(error.details.map(detail => detail.message))
}
    next()
}

const updateJewelMiddleware = async (req, res, next) => {
    const { post_id } = req.params
    const { error } = updateJewelSchema.validate(req.body)
    if (error) {
        res.status(400).json(error.details.map(detail => detail.message))
    }

    const post = await postById(post_id)
    if (!post) {
        res.status(400).json({message: "La joya no existe"})
    }

    req.oldData = post
    next()
}

export { createJewelMiddleware, updateJewelMiddleware }