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

/* socket.on('newProduct', products => {
  // Actualizar la lista de productos en tiempo real
  const productList = document.getElementById('productsUl');
  productList.innerHTML = '';

  products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.textContent = `Title: ${product.title}, Description: ${product.description}, Price: ${product.price}`;
    productList.appendChild(listItem);
  });
}); */

/* 
socket.on("products", products => {
  const innerProduct = handlebars.compile(`
    {{#each products}}
    
    <strong>Title:</strong> ${productComplete.title}<br>
    <strong>Description:</strong> ${productComplete.description}<br>
    <strong>Price:</strong> ${productComplete.price}<br>
    <strong>Thumbnail:</strong> ${productComplete.thumbnail}<br>
    <strong>Code:</strong> ${productComplete.code}<br>
    <strong>Stock:</strong> ${productComplete.stock}<br>
    <strong>Id:</strong> ${productComplete.id}<br>
    {{/each}}
  `);
  const template = innerProduct({products});
  productsAll.innerHTML = template
})
 */