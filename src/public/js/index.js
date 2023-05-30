const socket = io();

socket.emit('message', 'hola a todos , esto es un mensaje desde el front');

socket.on('event_socket_individual', data => {
    console.log(data);
})

socket.on('event_all_left_actualy', data =>{
    console.log(data);
})

socket.on('event_all', data => {
    console.log({products});
})

io.on(products)