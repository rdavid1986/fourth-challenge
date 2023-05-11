import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path= path;
        this.products = [];
    }
    addProduct( title, description, price, thumbnail, code, stock ){
        
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
                fs.writeFile(this.path, JSON.stringify(products),(error) => {
                    if(error) return console.log(`Error on write file: ${error}`);
                })
                console.log(`Products with ID : ${id} was succefully deleted`);
            }else  {
                console.log(`Product to subtract not found with ID : ${id}`);
            }
        })
    }
    updateProduct(id,updateProduct){
        fs.readFile(this.path,'utf-8', (error,result) => {
            if (error) return console.log(`Error reading file: ${error}`);
        
            const products = JSON.parse(result);
            const index = products.findIndex(product => product.id === id);
            if(index !== -1){
                 products[index] = {
                    ...products[index],
                    ...updateProduct
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
/* const productManager = new ProductManager('./products.json');  */
/* 
//addProduct
//Test product 1
productManager.addProduct('test Product 1', 'test product', 200, 'no image', 'abc123', 25);
//test product 2
productManager.addProduct('test Product 2', 'test product', 200, 'no image', 'abc124', 25); 
//test product 3
productManager.addProduct('test Product 3', 'test product', 200, 'no image', 'abc124', 25); // Repeat code product
//test product 4
productManager.addProduct('test Product 4', '', 200, 'no image', 'abc130', 25) // Product description is empty
//test product 5
productManager.addProduct('test Product 5', 'test product', 200, 'no image', 'abc132', 25);
//test product 6  
productManager.addProduct('test Product 6', 'test product', 200, 'no image', 'abc133', 25);
//test product 7  
productManager.addProduct('test Product 7', 'test product', 200, 'no image', 'abc134', 25);
//test product 8  
productManager.addProduct('test Product 8', 'test product', 200, 'no image', 'abc135', 25);
//test product 9  
productManager.addProduct('test Product 9', 'test product', 200, 'no image', 'abc136', 25);  
//test product 10
productManager.addProduct('test Product 10', 'test product', 200, 'no image', 'abc137', 25);
//test product 11  
productManager.addProduct('test Product 11', 'test product', 200, 'no image', 'abc138', 25);
//test product 12  
productManager.addProduct('test Product 12', 'test product', 200, 'no image', 'abc139', 25);  
 */
//getProducts
/* productManager.getProducts(); */

//getProductById 
//test product id 1
/* productManager.getProductById(1); */

//subtractProducT
//subtract "test product 2", "ID 2"
/*  productManager.subtractProduct(2); */

//UpdateProduct
const updateProduct = {
    title: 'updated product',
    description: 'updated product description',
    price: 150,
    thumbnail: 'no image',
    code: 'aaa333',
    stock: 5
}
//Updating product 3
/* productManager.updateProduct(3,updateProduct); */
