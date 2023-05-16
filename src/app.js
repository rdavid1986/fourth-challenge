import express from "express";
import ProductManager from "./productManager.js";
//Create const express();
const app = express();
//We create the instance of the class
const productManager = new ProductManager('./src/products.json');
//We configure URL dynamism
app.use(express.urlencoded({ extended:true}));
//wellcome greeting
app.get('/', (req, res)=> {
    console.log(req)
    res.send("Wellcome")
})
//rute /products type app.get calls the productManager class method getProducts();
app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    console.log("hola")
    res.send(products)
});
//rute /product?limit get limited product list default in 5 products or the amount of you choose 
app.get('/product', async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const products = await productManager.getProducts();
    const productsLimit = products.slice(0,limit);
    console.log("chau")
    res.send(JSON.stringify(productsLimit))
});

//rute /products/:id get products by id in products.json of ProductsManager class
app.get('/products/:id', async  (req, res) => {
    const id = req.params.id
    const products = await productManager.getProductById(id);
    if(products) res.send(products)
    else res.send(`Error  404 : products not found with id : ${id}`)
});

app.listen(8080, () => console.log('Listening on port 8080'));