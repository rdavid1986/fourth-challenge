import {Router} from "express";

const router = Router();

const carts = [];
router.get("/", (req, res) => {
    res.send("wellcome to cart");
    console.log("router.get carts");
})

export default router;