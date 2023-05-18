import {Router} from "express";
import ProductManager from "../productManager.js";
const router = Router();

//We create the instance of the class
const productManager = new ProductManager('src/products.json');
//wellcome greeting
/* router.get('/', (req, res)=> {
    console.log(req)
    res.send("Wellcome")
}) */
//rute /products type app.get calls the productManager class method getProducts();
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    console.log("router.get products");
    res.send(products);
});
//rute /product?limit get limited product list default in 5 products or the amount of you choose 
router.get('/limit', async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const products = await productManager.getProducts();
    const productsLimit = products.slice(0,limit);
    res.send(JSON.stringify(productsLimit));
    console.log("router.get limit products");
});

//rute /products/:id get products by id in products.json of ProductsManager class
router.get('/:id', async  (req, res) => {
    const id = req.params.id
    const products = await productManager.getProductById(id);
    if(products) res.send(products);
    else res.send(`Error  404 : products not found with id : ${id}`);
    console.log("router.get productsById");
});

router.post('/', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const thumbnail = req.body.thumbnail
    const code = req.body.code
    
    
    productManager.addProduct(title, description, price, thumbnail, code);
    res.send({status: "succes", message: "productAdded"});
})

export default router;