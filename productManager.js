const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path= path;
        this.products = [];
       
    }
    
    addProduct({ title = '', description = '', price = 0, thumbnail = '', code = '', stock = 0 } = {}){
        
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.autoincrementingId()
        }
        
        if(this.products.some(existingProduct => existingProduct.code === product.code)) {
            console.log(`ERROR: this product code : ${product.code} already exists in products`);
            console.log("--------------------------------");
        } else if (title === "" || description === "" || price === "" || thumbnail === "" || code === "" || stock === "") {
            console.log("Please complete all fields to push product")
            console.log("--------------------------------");
        } else {
            this.products.push(product);
            fs.writeFile(this.path, JSON.stringify(this.products), (error)=> {
                if(error) return console.log(`Error writing ${error}`);
            })
        }
        
    };
    autoincrementingId() {
        if(this.products.length === 0) {
            this.id = 1;
        }else {
            const lastId = this.products[this.products.length - 1];
            this.id = lastId.id + 1;
        }
        return this.id
    }
    getProducts(){
        fs.readFile(this.path, 'utf-8', (error, result) => {
            if(error) return console.log(`Error in reading: ${error}`);
            const products = JSON.parse(result);
            console.log("Result of getProducts :");
            console.log(products);
            console.log("--------------------------------");
        });
    }
    getProductById(id){
        fs.readFile(this.path, 'utf-8', (error,result) => {
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
    subtractProduct(id){
        fs.readFile(this.path, 'utf-8', (error,result) => {
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
    updateProduct(id, updatedProduct){
        fs.readFile(this.path,'utf-8', (error,result) => {
            if (error) return console.log(`Error reading file: ${error}`);
        
            const products = JSON.parse(result);
            const index = this.products.findIndex(product =>product.id === id);
            if(index !== -1){
                 products[index] = {
                    ...products[index],
                    ...updatedProduct
                 }
                 fs.writeFile(this.path, JSON.stringify(products), (error) => {
                     if (error) return console.log(`Error in writring file : ${error}`);
                     console.log('Product updated successfully')
                 });
            }else {
                console.log(`Products with id ${id} not found`);
            }
        });
    }
}

//Creating a new product
const productManager = new ProductManager('./products.json'); 

//addProduct
//Test product 1
productManager.addProduct({title: 'test Product 1', description: 'test product', price: 200, thumbnail: 'no image', code: 'abc123', stock: 25})
//test product 2
productManager.addProduct({title: 'test Product 2', description: 'test product', price: 200, thumbnail: 'no image', code: 'abc124', stock: 25}) 
//test product 3
productManager.addProduct({title: 'test Product 3', description: 'test product', price: 200, thumbnail: 'no image', code: 'abc124', stock: 25}) // Repeat code product
//test product 4
productManager.addProduct({title: 'test Product 4', description: '', price: 200, thumbnail: 'no image', code: 'abc130', stock: 25}) // Product description is empty
//test product 5
productManager.addProduct({title: 'test Product 5', description: 'test product', price: 200, thumbnail: 'no image', code: 'abc132', stock: 25}) // Repeat code product

//getProducts
productManager.getProducts();

//getProductById 
//test product id 1
productManager.getProductById(1);

//subtractProdutc
//subtract test product 2
productManager.subtractProduct(2);

//UpdateProduct
//Updating product 3
productManager.updateProduct(3,{title: 'Updated produtc', description: 'updated product', price: 150, thumbnail: 'no image', code: 'aaa333', stock: 5});