import productsManager from "productsManager";
const socket = io();

socket.emit('message', 'hola a todos , esto es un mensaje desde el front');

socket.on('individual_products', products => {
    io.emit(products);
})

socket.on('All_but_current_products', products =>{
    console.log(products);
    socket.emit(products);
})

socket.on('event_everyone_receives_products', products => {
    console.log(products);
    socket.emit(products);
})
