import express from "express";
import ProductManager from "./productManager.js";

const app = express();

const productManager = new ProductManager('./products.json');

app.use(express.urlencoded({ extended:true}));

app.get('/products', (request, response) => {
    const products = productManager.getProducts();
    response.send(console.log(products))
});
app.get('/',async (request, response)=> {
    response.send("Bienvenidos ")
})

app.listen(8080, () => console.log('Listening on port 8080'));