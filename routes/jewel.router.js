import express from "express";
import {
    getAllJewels,
    createJewel,
    updateJewel,
    deleteJewel,
    getFilteredJewels 
} from "../src/controllers/jewel.controllers.js";

const router = express.Router();

router.get("/", getAllJewels);
router.post("/", createJewel);
router.put("/:id", updateJewel);
router.delete("/:id", deleteJewel);


router.get("/filtros", getFilteredJewels);
export default router;
