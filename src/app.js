import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsProducts from "./routes/products.router.js"
import __dirname from "./utils.js";

const app = express();

//Middleware
app.use(express.json());
//We configure URL dynamism
app.use(express.urlencoded({ extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
//handlebars structure
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', "handlebars");

app.use("/", viewsProducts);

const server = app.listen(8080, () => console.log("Server running..."));


const io = new Server (server);

io.on('connection', socket => {
    console.log("New connected client");
    
    socket.on('products', productManager => {

        io.emit('products', productManager.getProducts());
    })
    socket.emit('individual_products', 'This message is only received by socket');

    socket.broadcast.emit('All_but_current_products', 'It will be seen by all customers except the current one');

    io.emit('event_everyone_receives_products', 'It is received by all customers');
});

