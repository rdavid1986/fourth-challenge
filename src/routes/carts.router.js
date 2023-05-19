import { Router } from 'express';
import CartsManager from "../cartsManager.js";

const router = Router();

const cartsManager = new CartsManager('src/carts.json');

//Route to get all carts
router.get('/', async (req, res)=> {
    const carts = await cartsManager.getCarts();
    console.log("Router.get/cart");
    res.send(carts)
});
//Route to get a cart by id
router.get('/:cid', async  (req, res) => {
    const id = req.params.cid;
    const cart = await cartsManager.getCartById(id);
    if(cart) res.send(cart);
    else res.send(`Error  404 : cart not found with id : ${id}`);
    console.log("router.get cartById");
});
//Route to create a new cart
router.post('/', (req, res) => {
    cartsManager.addToCart()
    res.send({status: "succes", message: "cartAdded"});
});
//Route to create a new product in a cart
router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const cartId = await cartsManager.getCartById(cid);
    const id = req.params.pid;
    
    async function getQuantity() {
        try {
            const cartProductId = cartId.products.find(product => product.id === parseInt(id));
            if (cartProductId) {
                // Store the quantity found
                cartProductId.quantity +1;
                return cartProductId.quantity;
            }else{
                return 1;
            }
            
        } catch (error) {
            console.log("Error in getQuantity function", error);
        }
    }
    
    
    const product = {
        id,
        quantity: await getQuantity(),
    }
    

    cartsManager.addProductToCart(cid, product);
    res.send({ status: "success", message: "Products added to cart" });
})

export default router;