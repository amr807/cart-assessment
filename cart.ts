type Product = {  
  name: string;
  price: number;
  quantity: number;
  expiryDate?: Date;
  isShipping?: boolean;
  weight?: number; 
}

type CartItem = {
  product: Product;
  quantity: number;
};

class Cart {
  private items: CartItem[] = [];

  add(p: Product, q: number) {
    try{
    if (q > p.quantity) {
      throw new Error(`The ${p.name} is out of stock`);
    }

    this.items.push({
      product: p,
      quantity: q
    });}
    catch (error) {
      console.error(error.message);
    }
  }

  getItems() {
    return this.items;
  }

  getTotal() {
    let totalItem = 0;
    let shipping = 0;

    this.items.forEach(item => {
      totalItem += item.product.price * item.quantity;
      if (item.product.isShipping && item.product.weight) {
        shipping += item.product.weight * item.quantity;
      }
    });

    return {
      totalItem,
      shipping,
      total: totalItem + shipping
    };
  }
}

function checkout(balance: number, cart: Cart) {
  const items = cart.getItems();
try{
  if (items.length === 0) {
    throw new Error("Cart is empty");
  }

  const { totalItem, shipping, total } = cart.getTotal();

  if (total > balance) {
    throw new Error("Balance not enough");
  }

  console.log("- Shipment notice -");

  let totalWeight = 0;
  items.forEach(item => {
    if (item.product.isShipping && item.product.weight) {
      const itemWeight = item.product.weight * item.quantity;
      totalWeight += itemWeight;
      console.log(`${item.quantity}x ${item.product.name} ---------------> ${itemWeight} g`);
    }
  });
  console.log("Total package weight:", totalWeight / 1000, "kg");

  console.log("- Checkout receipt -");
  items.forEach(item => {
    console.log(`${item.quantity}x ${item.product.name} - ${item.product.price * item.quantity}`);
  });

  console.log("Subtotal:", totalItem);
  console.log("Shipping:", shipping);
  console.log("Total:", total);
  console.log("Remaining balance:", balance - total);
}
catch (error) {
  console.error( error.message);}

}


const cheese: Product = {
  name: "cheese",
  price: 5,
  quantity: 10,
  expiryDate: new Date("2025-08-01"),
  isShipping: true,
  weight: 200
};

const scratchCard: Product = {
  name: "scratchCard",
  price: 10,
  quantity: 5,
  isShipping: false
};

const biscuit: Product = {
  name: "biscuit",
  price: 2,
  quantity: 0,
  expiryDate: new Date("2024-12-31"),
  isShipping: true,
  weight: 100}

const tv: Product = {
  name: "tv",
  price: 300,
  quantity: 1,
  isShipping: true,
  weight: 700
};

const myCart = new Cart();
myCart.add(cheese, 2);
myCart.add(scratchCard, 1);
myCart.add(tv, 1);
myCart.add(biscuit, 3);  // this will be out of stock
const Balance = 1500;

checkout(Balance, myCart);