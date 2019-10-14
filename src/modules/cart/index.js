/* Cart constructor */
module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;
    /* function to add products in cart */
    this.add = (item, id) => {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = {item: item, quantity: 0, price: 0};
        }
        cartItem.quantity++;
        cartItem.price = cartItem.item.price * cartItem.quantity;
        this.totalItems++;
        this.totalPrice += cartItem.item.price;
    };
    /* function to remove products from cart */
    this.remove = (id) =>{
        this.items[id].quantity--;
        this.totalItems--;
        this.items[id].price =  this.items[id].quantity * this.items[id].item.price;
        this.totalPrice -= this.items[id].item.price;
        if(this.items[id].quantity === 0){
            delete this.items[id];
        }
    };
};