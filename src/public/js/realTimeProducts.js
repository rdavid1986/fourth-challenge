
form.addEventListener('submit', event => {
    console.log("aca renderiza");
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const productComplete = { title, description, code, price, stock, thumbnail}
    const newLiProduct = document.createElement("li");
    const productsUl = document.getElementById("productsUl");

    title.value = "";
    description.value = ""; 
    code.value = "";
    price.value = "";
    stock.value = "";
    thumbnail.value = "";
    
    newLiProduct.style.margin = "20px";
    newLiProduct.innerHTML = `
    <strong>Title:</strong> ${productComplete.title}<br>
    <strong>Description:</strong> ${productComplete.description}<br>
    <strong>Price:</strong> ${productComplete.price}<br>
    <strong>Thumbnail:</strong> ${productComplete.thumbnail}<br>
    <strong>Code:</strong> ${productComplete.code}<br>
    <strong>Stock:</strong> ${productComplete.stock}<br>
    `;
    productsUl.appendChild(newLiProduct);
    socket.emit('message', productComplete)
    window.location.href = '/realtimeproducts';
})


