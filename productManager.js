const fs = require('fs');

class ProductManager {
    static products = [];
    constructor(path, title, description, price, thumbnail, code, stock) {
        this.path= path;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
    
    static addProduct(product){
        if(!fs.existsSync('./products.json')) {
            fs.writeFileSync('./products.json',JSON.stringify([]),(error) => {
                if(error) return console.log(`Error writing: ${error}`);
                console.log(`created new products file`);
            });
        }
        fs.readFile('./products.json', 'utf-8', (error, result) => {
            if(error) return console.log(`Error in reading file ${error}`);
            const products = JSON.parse(result);
            if(products.some(existingProduct => existingProduct.code === product.code)) {
                console.log(`ERROR: this product code : ${product.code} already exists in products`);
            } else if (product.title === "" || product.description === "" || product.price === "" || product.thumbnail === "" || product.code === "" || product.stock === "") {
                if(product.title === ""){
                    console.log("Please complete the 'title' field to push product")
                }else if(product.description === "" ){
                    console.log("Please complete the 'description' field to push product");
                }else if(product.price === "" ){
                    console.log("Please complete the 'price' field to push product");
                }else if(product.thumbnail === "" ){
                    console.log("Please complete the 'thumbnail' field to push product");
                }else if(product.code === "" ){
                    console.log("Please complete the 'code' field to push product");
                }else{
                    console.log("Please complete the camp stock in");
                }
            } else {
                if(products.length === 0) {
                    product.id = 1;
                    products.push(product);
                }else {
                    product.id = products[products.length - 1].id + 1 || 1;
                    products.push(product);
                }
                fs.writeFile('./products.json', JSON.stringify(products), (error)=> {
                    if(error) return console.log(`Error writing ${error}`);
                    console.log("---------------------------");
                    console.log(`Product added and file update`);
                })
            }
        });
    }
    static getProducts(){
        fs.readFile('./products.json', 'utf-8', (error, result) => {
            if(error) return console.log(`Error in reading: ${error}`);
            const products = JSON.parse(result);
            console.log("this is result of getProducts");
            console.log(products);
            console.log("---------------------------");
        });
    }
    static getProductById(id){
        fs.readFile('./products.json', 'utf-8', (error,result) => {
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
    static subtractProduct(id){
        fs.readFile('./products.json', 'utf-8', (error,result) => {
            if(error) return console.log(`Error on read file: ${error}`);
            const products = JSON.parse(result);
            const idToDelete = products.findIndex(product => product.id === id);
            if (idToDelete !== -1) {
                products.splice(idToDelete,1);
                fs.writeFile('./products.json',JSON.stringify(products),(error) => {
                    if(error) return console.log(`Error on write file: ${error}`);
                })
                console.log(`Products with ID : ${id} was succefully deleted`);
            }else  {
                console.log(`Product to subtract not found with ID : ${id}`);
            }
            
        })
    }
    static updateProduct(id, updatedProduct){
        fs.readFile('./products.json','utf-8', (error,result) => {
            if (error) return console.log(`Error reading file: ${error}`);
        
            const products = JSON.parse(result);
            const index = products.findIndex(product => product.id === id);
            if(index !== -1){
                 products[index] = {
                    ...products[index],
                    ...updatedProduct
                 }
                 fs.writeFile('./products.json', JSON.stringify(products), (error) => {
                     if (error) return console.log(`Error in writring file : ${error}`);
                     console.log('Product updated successfully')
                 });
            }else {
                console.log(`Products with id ${id} not found`);
            }
        });
    }
}
const product1 = new ProductManager("./products.json","Producto prueba 1", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
const product2 = new ProductManager("./products.json","Producto prueba 2", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);//Repeated key product
const product3 = new ProductManager("./products.json",        ""         , "Este es un producto prueba", 200, "sin imagen", "abc124", 25);//Product title is empty
const product4 = new ProductManager("./products.json","Producto prueba 4", "Este es un producto prueba", 200, "sin imagen", "abc125", 25);

//Firt you must add products here
//To push as many products as possible, you need to run the file.js twice
/* 
ProductManager.addProduct(product1);
ProductManager.addProduct(product2);//Repeat key product
ProductManager.addProduct(product3);//product title is empty
ProductManager.addProduct(product4);
console.log("-----------------------"); */

//To update a product uncomment next two lines

/* ProductManager.updateProduct(1, new ProductManager("./products.json","Producto prueba modificado", "Este es un producto modificado", 500, "sin imagen", "abc333", 25)); */

//then you must uncoment next lines and comment all addProduct

ProductManager.getProductById(19); //This product does not exist
console.log("-----------------------");
ProductManager.getProducts();

console.log("-----------------------");
 ProductManager.getProductById(1);
console.log("-----------------------");
 ProductManager.subtractProduct(2);
console.log("-----------------------");