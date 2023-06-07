import {Router} from "express";
import ProductManager from "../productManager.js";
const router = Router();

//We create the instance of the class
const productManager = new ProductManager('src/products.json');
//rute /products type app.get calls the productManager class method getProducts();

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realtimeproducts', {products} );
    
  });
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {products} );
    
  });
//rute /product?limit get limited product list default in 5 products or the amount of you choose 
router.get('/limit', async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const products = await productManager.getProducts();
    const productsLimit = products.slice(0,limit);
    res.send(JSON.stringify(productsLimit));
    console.log("router.get limit products");
});

//rute /product/:id get products by id in products.json of ProductsManager
router.get('/product/:pid', async  (req, res) => {
    const id = req.params.pid;
    const products = await productManager.getProductById(id);
        res.send(products);
});

router.post('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    
    const { title, description, price, thumbnail, code, stock } = req.body;
    
    await productManager.addProduct(title, description, price, thumbnail, code, stock);

    router.post('/realtimeproducts', async (req, res) => {
        try {
            const { title, description, price, thumbnail, code, stock } = req.body;
            await productManager.addProduct(title, description, price, thumbnail, code, stock);
            res.status(200).send(JSON.stringify({ status: 'Success', message: 'Product added successfully' }));

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });


    /* const newLiProduct = document.createElement("li");
    const productsUl = document.getElementById("productsUl");
    
    newLiProduct.style.margin = "20px";
    newLiProduct.innerHTML = `
    <strong>Title:</strong> ${productComplete.title}<br>
    <strong>Description:</strong> ${productComplete.description}<br>
    <strong>Price:</strong> ${productComplete.price}<br>
    <strong>Thumbnail:</strong> ${productComplete.thumbnail}<br>
    <strong>Code:</strong> ${productComplete.code}<br>
    <strong>Stock:</strong> ${productComplete.stock}<br>
    <strong>Id:</strong> ${productComplete.id}<br>
    `;
    productsUl.appendChild(newLiProduct);
    socket.emit('message', productComplete)
    
    res.render('realTimeProducts', { products }); */
   /*  const form = document.getElementById('form');
    form.addEventListener('submit', event => {
        console.log("aca renderiza en router");
        event.preventDefault();
        const productComplete = { title, description, code, price, stock, thumbnail}
        const newLiProduct = document.createElement("li");
        const productsUl = document.getElementById("productsUl");
        
        newLiProduct.style.margin = "20px";
        newLiProduct.innerHTML = `
        <strong>Title:</strong> ${productComplete.title}<br>
        <strong>Description:</strong> ${productComplete.description}<br>
        <strong>Price:</strong> ${productComplete.price}<br>
        <strong>Thumbnail:</strong> ${productComplete.thumbnail}<br>
        <strong>Code:</strong> ${productComplete.code}<br>
        <strong>Stock:</strong> ${productComplete.stock}<br>
        <strong>Id:</strong> ${productComplete.id}<br>
        `;
        productsUl.appendChild(newLiProduct);
        socket.emit('message', productComplete)
        window.location.href = '/realtimeproducts';
    }) */
    
    
});
/* router.post('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { products });
        const { title, description, price, thumbnail, code, stock } = req.body;
        productManager.addProduct(title, description, price, thumbnail, code, stock);
        
    } catch (error) {
        // Manejo del error
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
}); */
/* router.post('/realtimeproducts', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        await productManager.addProduct(title, description, price, thumbnail, code, stock);
        res.status(200).json({ status: 'Success', message: 'Product added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}); */
/* router.post('/realtimeproducts', async (req, res) => {
    try {
      const { title, description, price, thumbnail, code, stock } = req.body;
      await productManager.addProduct(title, description, price, thumbnail, code, stock);
      
      const products2 = await productManager.getProducts(); // Obtener el listado actualizado de productos
      res.send(products2)
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }); */

router.put("/:pid", (req, res) => {
    const id = req.params.pid;
    const { title, description, price, thumbnail, code, stock } = req.body;
    const updateProduct = { 
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }
    console.log(id)
    console.log(updateProduct)
    productManager.updateProduct(id,updateProduct);
    consolo.log()
    res.send({status: "Updated product succes", message: "Updated product" })
})

router.delete("/:pid", (req, res) => {
    const id = req.params.pid;
    productManager.deleteProduct(id);
    res.render('realTimeProducts', {products} );

})
export default router;


