import React from 'react';

var Cart = React.createClass({

  //increase quantity by 1
  increment(itemData) {
    itemData.quantity += 1;
    this.props.setItemQuantity(itemData);
  },

  //decrease quantity by 1, but not below 0
  decrement(itemData) {
    if (itemData.quantity == 0) return;
    itemData.quantity -= 1
    this.props.setItemQuantity(itemData);
  },

  //remove item from cart
  removeItem(itemData) {
   itemData.quantity = 0
   this.props.setItemQuantity(itemData);
  },

  //map through cartContents prop and display information for each item that's been selected from the Store
  //options to modify quantity or remove from the cart
  //display total price
  renderCartContents: function() {
    const that = this;
    return (
        <div>
          <h3>Cart contents</h3>
          {this.props.cartContents.map(function(item, index) {
            return (
              <div className="cart-contents-container">
                <div className='cart-item' key={index}>
                  <div>{item.description} - ${item.price}</div>
                  <div>Total price: ${item.price * item.quantity}</div>
                  <div>
                    <button onClick={that.decrement.bind(null, item)}> - </button>
                      Quantity: {item.quantity}
                    <button onClick={that.increment.bind(null, item)}> + </button>
                    <button className="remove-button" onClick={that.removeItem.bind(null, item)}> Remove from cart </button>
                  </div>
                </div>
              </div>
              )
          })}
          <div className="cart-total">Total: ${this.renderTotalPrice()}</div>
        </div>
      )
  },

  //returns the sum price for all items in the cart
  renderTotalPrice: function() {
    let total = 0;
    const cartContents = this.props.cartContents;
      for(let item in cartContents ){
        total += cartContents[item].price * cartContents[item].quantity;
      }
      return total.toFixed(2);
  },

  //show cart contents only if there are items in the cart
  render: function(){
    return (
      <div>
        <button className='link back-to-store-button' onClick={this.props.backToStore}>Keep Shopping</button>
        {this.props.cartContents.length === 0 ? <h3>Your cart is empty!</h3> : this.renderCartContents()}
      </div>
    )
  }
});

export default Cart;