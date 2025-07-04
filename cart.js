var Cart = /** @class */ (function () {
    function Cart() {
        this.items = [];
    }
    Cart.prototype.add = function (p, q) {
        try {
            if (q > p.quantity) {
                throw new Error("The ".concat(p.name, " is out of stock"));
            }
            this.items.push({
                product: p,
                quantity: q
            });
        }
        catch (error) {
            console.error(error.message);
        }
    };
    Cart.prototype.getItems = function () {
        return this.items;
    };
    Cart.prototype.getTotal = function () {
        var totalItem = 0;
        var shipping = 0;
        this.items.forEach(function (item) {
            totalItem += item.product.price * item.quantity;
            if (item.product.isShipping && item.product.weight) {
                shipping += item.product.weight * item.quantity;
            }
        });
        return {
            totalItem: totalItem,
            shipping: shipping,
            total: totalItem + shipping
        };
    };
    return Cart;
}());
function checkout(balance, cart) {
    var items = cart.getItems();
    try {
        if (items.length === 0) {
            throw new Error("Cart is empty");
        }
        var _a = cart.getTotal(), totalItem = _a.totalItem, shipping = _a.shipping, total = _a.total;
        if (total > balance) {
            throw new Error("Balance not enough");
        }
        console.log("- Shipment notice -");
        var totalWeight_1 = 0;
        items.forEach(function (item) {
            if (item.product.isShipping && item.product.weight) {
                var itemWeight = item.product.weight * item.quantity;
                totalWeight_1 += itemWeight;
                console.log("".concat(item.quantity, "x ").concat(item.product.name, " ---------------> ").concat(itemWeight, " g"));
            }
        });
        console.log("Total package weight:", totalWeight_1 / 1000, "kg");
        console.log("- Checkout receipt -");
        items.forEach(function (item) {
            console.log("".concat(item.quantity, "x ").concat(item.product.name, " - ").concat(item.product.price * item.quantity));
        });
        console.log("Subtotal:", totalItem);
        console.log("Shipping:", shipping);
        console.log("Total:", total);
        console.log("Remaining balance:", balance - total);
    }
    catch (error) {
        console.error(error.message);
    }
}
var cheese = {
    name: "cheese",
    price: 5,
    quantity: 10,
    expiryDate: new Date("2025-08-01"),
    isShipping: true,
    weight: 200
};
var scratchCard = {
    name: "scratchCard",
    price: 10,
    quantity: 5,
    isShipping: false
};
var biscuit = {
    name: "biscuit",
    price: 2,
    quantity: 0,
    expiryDate: new Date("2024-12-31"),
    isShipping: true,
    weight: 100
};
var tv = {
    name: "tv",
    price: 300,
    quantity: 1,
    isShipping: true,
    weight: 700
};
var myCart = new Cart();
myCart.add(cheese, 2);
myCart.add(scratchCard, 1);
myCart.add(tv, 1);
myCart.add(biscuit, 3);
var Balance = 1500;
checkout(Balance, myCart);
