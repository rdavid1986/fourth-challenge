//multer
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/public');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

//__dirname

import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//Connect to mongo
import { connect } from 'mongoose';
export async function connectMongo() {
  try {
    await connect('mongodb+srv://rdavid1986:123asd123asd@cluster0.gjakwda.mongodb.net/');
    console.log('mongo!');
  } catch (error) {
    console.log(error);
    throw 'can not connect to the DB';
  }
}

//Socket
import { Server } from 'socket.io';
import ProductManager from './productManager.js';
import { messageModel } from './dao/models/messageModel.js';

export function connectSocket(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', (socket) => {
    console.log('Un cliente se ha conectado ' + socket.id);

   //add & delete products
    socket.on('new-product', async (newProduct) => {
      const data = new ProductManager('./src/data/products.json');
      await data.addProduct(newProduct);

      const products = await data.getProducts();
      console.log(products);
      socketServer.emit('products', products);
    });

    socket.on('delete-product', async (productId) => {
      const data = new ProductManager('./src/data/products.json');
      await data.deleteProduct(productId);

      const products = await data.getProducts();
      socketServer.emit('products', products);
    });

    //Chat
    //recive
    socket.on('msg_front_to_back', async (msg) => {
      const msgCreated = await messageModel.create(msg);
      const msgs = await ChatModel.find({});
      socketServer.emit('msg_back_to_front', msgs);
    });
  });
}
