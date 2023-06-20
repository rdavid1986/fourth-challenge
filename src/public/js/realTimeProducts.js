const productsUl = document.getElementById("productsUl");

/* const submit = () => {
  {
    console.log("estamos");
  }
}; */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("aca renderiza");
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const productComplete = { title, description, code, price, stock, thumbnail };

  //   title.value = "";
  //   description.value = "";
  //   code.value = "";
  //   price.value = "";
  //   stock.value = "";
  //   thumbnail.value = "";

  socket.emit("client:AddProduct", productComplete);
  //   window.location.href = "/realtimeproducts";
});


let initialized = false;

socket.on("server:Productadded", (a) => {
    const newLiProduct = document.createElement("li");
    newLiProduct.style.margin = "20px";
    newLiProduct.innerHTML = `
    <strong>Title:</strong> ${a.title}<br>
    <strong>Description:</strong> ${a.description}<br>
    <strong>Price:</strong> ${a.price}<br>
    <strong>Thumbnail:</strong> ${a.thumbnail}<br>
    <strong>Code:</strong> ${a.code}<br>
    <strong>Stock:</strong> ${a.stock}<br>
  `;

    if (initialized) {
        productsUl.appendChild(newLiProduct);
    }
});

socket.on("server:allproducts", (array) => {
    if (!initialized) {
        console.log(array);

        array.forEach((a) => {
            const newLiProduct = document.createElement("li");
            newLiProduct.style.margin = "20px";
            newLiProduct.innerHTML = `
        <strong>Title:</strong> ${a.title}<br>
        <strong>Description:</strong> ${a.description}<br>
        <strong>Price:</strong> ${a.price}<br>
        <strong>Thumbnail:</strong> ${a.thumbnail}<br>
        <strong>Code:</strong> ${a.code}<br>
        <strong>Stock:</strong> ${a.stock}<br>
      `;
            productsUl.appendChild(newLiProduct);
        });

        initialized = true;
    }
});