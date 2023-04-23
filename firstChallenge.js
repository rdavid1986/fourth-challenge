
const products = [];
class ProductManager{
    static lastId = -1;
    constructor(title, description, price, thumbnail, code, stock) {
        
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = 0;
        
    }
    static addProduct(product){
        if(products.some(existingProduct => existingProduct.code === product.code)){
            console.log(`ERROR: this product code : ${product.code} already exists in products`);
            
        } else if (product.title === "" || product.description === "" || product.price === "" || product.thumbnail === "" || product.code === "" || product.stock === ""){
                console.log("All fields are required");
        } else {
            product.id = ++ProductManager.lastId;
            products.push(product);
        }
    } 
}
function getProducts(){
    console.log(`Array products contains ${products.length} products` )
    console.log(products)
}
function getProductById(id){
    const productById = products.find(product => product.id === id);
    if(productById) {
        console.log(`this is the product that was searched by id "${productById.title}"`);
    } else {

        console.log(`Product not found with that ID`);
    }
}
getProducts()

const product1 = new ProductManager("Producto prueba 1", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
const product2 = new ProductManager("Producto prueba 2", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);//Repeated key product
const product3 = new ProductManager(        ""         , "Este es un producto prueba", 200, "sin imagen", "abc124", 25);//Product title is empty
const product4 = new ProductManager("Producto prueba 4", "Este es un producto prueba", 200, "sin imagen", "abc125", 25);

ProductManager.addProduct(product1);
ProductManager.addProduct(product2);
ProductManager.addProduct(product3);
ProductManager.addProduct(product4);

getProducts();

getProductById(1);
getProductById(19); //This product does not exist

