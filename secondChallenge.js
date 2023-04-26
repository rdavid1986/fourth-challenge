const fs = require('fs');

class ProductManager {
    static products = [];
    static path = './products.json';

    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
    
    static addProduct(product) {
       
        if(!fs.existsSync('./products.json')) {
            fs.writeFileSync('./products.json',JSON.stringify([]),(error) => {
                if(error) return console.log(`Error writing: ${error}`);
                console.log(`created new products file`);
            });
        }else {
            fs.readFile('./products.json', 'utf-8', (error,result) => {
                if(error) return console.log(`Error reading: ${error}`);
                const products = JSON.parse(result);
                if(products.some(existingProduct => existingProduct.code === product.code)) {
                    console.log(`ERROR: this product code : ${product.code} already exists in products`);
                } else if (product.title === "" || product.description === "" || product.price === "" || product.thumbnail === "" || product.code === "" || product.stock === "") {
                    if(product.title === ""){
                        const fields = (`All fields are required in this product in` , product);
                        console.log("Please complete the 'title' field to push product")
                        console.log(fields);
                    }else if(product.description === "" ){
                        console.log(fields);
                        console.log("Please complete the 'description' field to push product");
                    }else if(product.price === "" ){
                        console.log(fields);
                        console.log("Please complete the 'price' field to push product");
                    }else if(product.thumbnail === "" ){
                        console.log(fields);
                        console.log("Please complete the 'thumbnail' field to push product");
                    }else if(product.code === "" ){
                        console.log(fields);
                        console.log("Please complete the 'code' field to push product");
                    }else{
                        console.log(fields);
                        console.log("Please complete the camp stock in");
                    }
                } else {
                    if(ProductManager.products.length === 0) {
                        product.id=1;
                    }else {
                        product.id = ProductManager.products[ProductManager.products.length-1].id + 1
                    }
                    ProductManager.products.push(product);
                    fs.writeFile('./products.json', JSON.stringify(ProductManager.products), (error) => {
                        if(error) return console.log(`Error writing : ${error}`);
                        console.log(`Product added and file updated with products`);
                    });
                }
            })
            
        }
        

        
        console.log("---------------------------");
    }

    static getProducts() {
        fs.readFile('./products.json', 'utf-8', (error, result) => {
            if(error) return console.log(`Error in reading: ${error}`);
            const products = JSON.parse(result);
            console.log(products);
            console.log("---------------------------");
        });
    }
    
    static getProductById(id) {
            /* const filePath = './products.json'; */
            fs.access(ProductManager.path, fs.constants.F_OK, (err) => {
                if (err) {
                    console.log(`${path} does not exist`);
                    console.log("---------------------------");
                } else {
                    fs.readFile('./products.JSON', 'utf-8', (error,result) => {
                        if(error) return console.log(`Error in reading : ${error}`);
                        const products = JSON.parse(result);
                        const productById = products.find(product => product.id === id);
                        if (productById) {
                            console.log(`This is the product that was searched by id ${id} = `, productById);
                            console.log("---------------------------");
                        } else {
                            console.log(`Product not found with ID : ${id}`);
                            console.log("---------------------------");
                        }
                    })
                }
            });
        /* static deleteProduct (id){
            const idToDelete = ProductManager.products.find(product => product.id === id);
            if (idToDelete) {
                const erase = products.filter(product => product.id !== idToDelete);

            } else {
                console.log(`Product not found with ID : ${id}`);
            }
        } */
    }
}
const product1 = new ProductManager("Producto prueba 1", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
const product2 = new ProductManager("Producto prueba 2", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);//Repeated key product
const product3 = new ProductManager(        ""         , "Este es un producto prueba", 200, "sin imagen", "abc124", 25);//Product title is empty
const product4 = new ProductManager("Producto prueba 4", "Este es un producto prueba", 200, "sin imagen", "abc125", 25);

ProductManager.addProduct(product1);
ProductManager.addProduct(product2);
ProductManager.addProduct(product3);
ProductManager.addProduct(product4);

ProductManager.getProducts();

ProductManager.getProductById(1);
ProductManager.getProductById(19); //This product does not exist