import {Router} from "express";
import ProductManager from "../productManager.js";
const router = Router();

//We create the instance of the class
const productManager = new ProductManager('src/products.json');
//rute /products type app.get calls the productManager class method getProducts();
router.get('/realtimeproducts', async (req, res) => {
    // const products = await productManager.getProducts();
    /* const products = await productManager.getProducts(); */
    res.render('realtimeproducts');
    
  });
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {products} );
    
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

// router.post('/realtimeproducts', async (req, res) => {
//     const { title, description, price, thumbnail, code, stock } = req.body;
//      productManager.addProduct(title, description, price, thumbnail, code, stock);
//      await productManager.getProducts();
   
// });


router.put("/product/:pid", (req, res) => {
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

router.delete("/product/:pid", (req, res) => {
    const id = req.params.pid;
    productManager.deleteProduct(id);
    // res.render('realTimeProducts', {products} );

})
export default router;


