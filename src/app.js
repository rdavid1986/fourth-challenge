import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsProducts from "./routes/products.router.js";
import { __dirname, connectMongo, connectSocket } from './utils.js';
import cors from "cors";
import displayRoutes from "express-routemap";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


import ProductManager from "./productManager.js";
const app = express();
const PORT = 8080;

//Middleware
app.use(express.json());
//We configure URL dynamism
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
//handlebars structure
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsProducts);


app.use(cors());

const server = app.listen(PORT, () => displayRoutes(app));

const productManager = new ProductManager("./src/products.json");

//Connect to mongo
await connectMongo();

const io = new Server(server);

io.on("connection", async (socket) => {
  console.log("New client connect");

  socket.on("message", (data) => {
    console.log(data);
  });
  socket.emit("event_socket", "este msj solo lo recibe el socket");

  socket.broadcast.emit(
    "eveno_all_left_actualy",
    "Lo van a ver todos los clientes menos el actual"
  );

  io.emit("event_all_msj", "Lo reciben todos los clientes");

  socket.emit("server:allproducts", await productManager.getProducts());

  socket.on("client:AddProduct", async (productComplete) => {
    console.log(productComplete);
    productManager.addProduct(
      productComplete.title,
      productComplete.description,
      productComplete.price,
      productComplete.thumbnail,
      productComplete.code,
      productComplete.stock
    );

    io.emit("server:Productadded", productComplete);
  });
});
/* io.on('connection', socket => {
    console.log("Cliente conectado");
    socket.on('message', data => {
        const id = products.length + 1;
        const product = { id, ...data}
        products.unshift(product);
        fs.writeFileSync('./database/products.json',JSON.stringify(products, null, '\t'))
        io.emit('product', data)
    })
}) */
