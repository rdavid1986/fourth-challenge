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
    res.render(`home`, {products} )
});
router.get('/products/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
  });
//rute /product?limit get limited product list default in 5 products or the amount of you choose 
router.get('/limit', async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const products = await productManager.getProducts();
    const productsLimit = products.slice(0,limit);
    res.send(JSON.stringify(productsLimit));
    console.log("router.get limit products");
});

//rute /product/:id get products by id in products.json of ProductsManager
router.get('/product/:pid', async  (req, res) => {
    const id = req.params.pid;
    const products = await productManager.getProductById(id);
        res.send(products);
});

router.post('/', (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    productManager.addProduct(title, description, price, thumbnail, code, stock);
    io.emit(product)
})

router.put("/:pid", (req, res) => {
    const id = req.params.pid;
    const { title, description, price, thumbnail, code, stock } = req.body;
    const updateProduct = { 
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }
    console.log(id)
    console.log(updateProduct)
    productManager.updateProduct(id,updateProduct);
    consolo.log()
    res.send({status: "Updated product succes", message: "Updated product" })
})

router.delete("/:pid", (req, res) => {
    const id = req.params.pid;
    productManager.deleteProduct(id);
    res.send({status: "succes", message: "productAdded"});

})
export default router;


