import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils.js";
//Create const express();
const app = express();

//Middleware
app.use(express.json());
//We configure URL dynamism
app.use(express.urlencoded({ extended:true}));
//We configure dir URL public
app.use(express.static(`${__dirname}/public`));
//Configure products route
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(8080, () => console.log('Listening on port 8080'));