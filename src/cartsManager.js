import fs from "fs";
import {promises} from "fs";

export default class CartsManager {
    constructor(path){
        this.path = path;
        this.carts = [];
    }
    async addToCart(){
        const cart = {
            id: await this.autoId(),
            products: []
        }
        if(fs.existsSync(this.path)){
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            const listCartProduct = JSON.parse(carts);
            listCartProduct.push(cart)
            fs.writeFile(this.path, JSON.stringify(listCartProduct), (error)=> {
                if(error) return console.log(`Error: error in writing carts.json : ${error}`);
            });
        }else {
            this.carts.push(cart);

            fs.writeFile(this.path, JSON.stringify(this.carts), (error)=> {
                if(error) return console.log(`Error: error in writing carts.json : ${error}`);
            });
        }
    }
    async autoId(){
        try{
            if(fs.existsSync(this.path)){
                const carts = await fs.promises.readFile(this.path, 'utf-8');
                const listCartProduct = JSON.parse(carts);
                
                if(listCartProduct.length === 0){
                    this.id = 1
                }else {
                    const lastId = listCartProduct[listCartProduct.length -1].id;
                    this.id = lastId + 1;
                }
                return this.id;
            }else {
                if(this.carts.length === 0){
                        this.id = 1
                }else {
                    const lastId = carts[carts.length -1].id;
                    this.id = lastId + 1;
                }
                return this.id;
            }
        }catch(error){
            console.log(`Error in creating id : ${error}`);
        }
    }
    async getCarts(){
        try {
            const carts = await promises.readFile(this.path, 'utf-8');
            return JSON.parse(carts);
        } catch (error) {
            console.log(`Error: ${error}`);
            console.log(`Error in reading file : ${error}`);
        }
    }
    async addProductToCart(cartId, product){
        try {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex((cart) => cart.id === parseInt(cartId));
            console.log(cartId);
            if(cartIndex !== -1) {

                carts[cartIndex].products.push(product);
                
                fs.writeFile(this.path, JSON.stringify(carts), (error)=> {
                    if(error) console.log(`ERROR: error in writing file ${error}`);
                });
            }else{
                console.log(`Error: cart with id ${cartId} not found.`);
            }
        }catch{
            console.log(`Error in adding product to cart: ${error}`);
        }
    }
    async getCartById(id){
        try {
            const result = await promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(result);
            const cartById = carts.find(cart => cart.id === parseInt(id) );
            if(cartById) {
                console.log(`This is the cart searching by id : ${id}`);
                console.log("console de cartbyid" , cartById);
                return cartById;
            }else{
                console.log(`Product not found with id : ${id}`);
                console.log("console de productbyid" , cartById);
            }
        } catch (error) {
            console.log(`Error in reading file: ${error}`);
        }
    }
    
}