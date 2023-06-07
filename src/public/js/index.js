const socket = io();

socket.emit('message', 'wellcome');

socket.on('individual_products', products => {
    io.emit(products);
})

socket.on('All_but_current_products', products =>{
    console.log(products);
    socket.emit(products);
})

socket.on('event_everyone_receives_products', products => {
    console.log(products);
    io.emit(products);
    
})
