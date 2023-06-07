import fs from 'fs';
import { promises } from "fs";

export default class ProductManager {
    constructor(path) {
        this.path= path;
        this.products = [];
    }
    async addProduct( title, description, price, thumbnail, code, stock ){
        
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status: true,
            id: await this.autoId(),
        }
        if(fs.existsSync(this.path)){
            fs.readFile(this.path, 'utf-8', (error, res)=>{
                if(error) console.log(`Error: error in reading : ${error}`);
                const products = JSON.parse(res);
                if(products.some(existingProduct => existingProduct.code === product.code)) {
                    console.log(`ERROR: this product code : ${product.code} already exists in products`);
                    console.log("--------------------------------");
                } else if (title === "" || description === "" || price === "" || /* thumbnail === "" || thumbnail is commented because it is not obligatory in the challenge "primera entrega"*/code === "" || stock === "") {
                    console.log("Please complete all fields to push product")
                    console.log("--------------------------------");
                } else {
                    products.push(product);
                    fs.writeFile(this.path, JSON.stringify(products), (error)=> {
                        if(error) return console.log(`Error writing ${error}`);
                    })
                }

            })
        }else{
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
        }
    };
    async autoId() {
        try {
            const products = await promises.readFile(this.path, 'utf-8');
            const listProducts = JSON.parse(products);
            
            if (listProducts.length === 0) {
                this.id = 1;
            } else {
                const lastId = listProducts[listProducts.length - 1].id;
                this.id = lastId + 1;
            }
            return this.id;
        } catch (error) {
            console.log("error in generate id", error);
        }
    }
    async getProducts(){
        try {
            const products = await promises.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            console.log(`Error: ${error}`);
            console.log(`Error in reading file : ${error}`);
        }
    }
    async getProductById(id){
        try {
            const result = await promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(result);
            const productById = products.find(product => product.id === parseInt(id) );
            if(productById) {
                console.log(`This is the products searching by id : ${id}`);
                console.log("console de productbyid" , productById);
                return productById;
            }else{
                console.log(`Product not found with id : ${id}`);
                console.log(productById);
            }
        } catch (error) {
            console.log(`Error in reading file: ${error}`);
        }
    }
    async deleteProduct(id){
        const products = await promises.readFile(this.path, 'utf-8');
        const listProducts = JSON.parse(products)
        const idToDelete = listProducts.findIndex(product => product.id === parseInt(id));
        if (idToDelete !== -1) {
            listProducts.splice(idToDelete,1);
            fs.writeFile(this.path, JSON.stringify(listProducts),(error) => {
                if(error) return console.log(`Error on write file: ${error}`);
            })
            console.log(`Products with ID : ${id} was succefully deleted`);
        }else  {
            console.log(`Product to subtract not found with ID : ${id}`);
        }
    }
    async updateProduct(id,updateProduct){
        try{
            const products = await promises.readFile(this.path, 'utf-8');
            const listProducts = JSON.parse(products);
            const index = listProducts.findIndex(listProducts => listProducts.id === parseInt(id));
            if(index !== -1){
                listProducts[index] = {
                    ...listProducts[index],
                    ...updateProduct
                 }
                 promises.writeFile(this.path, JSON.stringify(listProducts), (error) => {
                     if (error) return console.log(`Error in writring file : ${error}`);
                     console.log('Product updated successfully')
                 });
            }else {
                console.log(`Products with id ${id} not found`);
            }
        }catch(error) {
            console.log(`Error: ${error}`);
        }
    }
}
