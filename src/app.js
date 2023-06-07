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
    console.log("New client connect");

    socket.on('message', data => {
        console.log(data);
    })
    socket.emit('event_socket', 'este msj solo lo recibe el socket');

    socket.broadcast.emit('eveno_all_left_actualy', 'Lo van a ver todos los clientes menos el actual');

    io.emit('event_all_msj', 'Lo reciben todos los clientes');
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