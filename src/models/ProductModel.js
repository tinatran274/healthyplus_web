class Product {
    constructor (id, name, cost, img, supplier) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.img = img;
        this.supplier = supplier    
    }
    toString() {
        return this.id + ', ' + this.name;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getCost() {
        return this.cost;
    }
    getImg() {
        return this.img;
    }
    getSupplier() {
        return this.supplier;
    }

}
// Firestore data converter
const ProductConverter = {
    toFirestore: (product) => {
        return {
            id: product.id,
            name: product.name,
            cost: product.cost,
            img: product.img,
            supplier: product.supplier,
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Product(data.id, data.name, data.cost, data.img, data.supplier);
    }
};
export default ProductConverter;