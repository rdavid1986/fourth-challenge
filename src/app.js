import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsProducts from "./routes/products.router.js"
import __dirname from "./utils.js";

const app = express();

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
    console.log("Nuevo cliente conectado...");

    socket.on('message', data => {
        console.log(data);
    })
    socket.emit('evento_socket_individual', 'este msj solo lo recibe el socket');

    socket.broadcast.emit('evento_todos_menos_actual', 'Lo van a ver todos los clientes menos el actual');

    io.emit('evento_todos_reciben_msj', 'Lo reciben todos los clientes');
});

io.on('connection ', socket => {
    console.log('conectado');
    socket.on('message1', data=> {
        io.emit('log', data);
    })
})