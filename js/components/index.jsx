import React from 'react';
import ReactDOM from 'react-dom';
import AddInventory from './add-inventory.jsx';
import Store from './store.jsx';
import InventoryForm from './inventory-form.jsx';
import Cart from './cart.jsx';
import update from 'react-addons-update';

//Entry to the app, controls state for all child components
var App = React.createClass({

  getInitialState: function() {
    return {
      currentInventory: [],
      cartContents: [],
      displayPage: {
        showAddInventory: true,
        showStore: false,
        showCart: false
      }
    }
  },

  //these three functions control which page is displayed: Store, Add Inventory, or Cart
  //Add Inventory is displayed by default
  showStore: function() {
    this.setState({displayPage: {showAddInventory: false, showCart: false, showStore: true}});
  },

  showAddInventory: function() {
    this.setState({displayPage: {showAddInventory: true, showCart: false, showStore: false}});
  },

  goToCart: function() {
    this.setState({displayPage: {showAddInventory: false, showCart: true, showStore: false}});
  },

  //displays the Store
  renderStore: function() {
    if (this.state.displayPage.showStore) {
      return (
        <div>
          <div id="add-inventory-link">
            <button className="link add-inventory-button" onClick={this.showAddInventory}>Add Inventory</button>
            <button className="link go-to-cart-button" onClick={this.goToCart}>Go to Cart</button>
          </div>
          <Store className="inventory-list"
                 currentInventory={this.state.currentInventory}
                 setItemQuantity={this.setItemQuantity}
                 addToCart={this.addToCart}/>
        </div>
      ) 
    }
  },

  //displays Add Inventory
  renderAddInventory: function() {
    if (this.state.displayPage.showAddInventory) {
      return (
        <div>
          <div id="add-inventory-link">
            <button className="link add-inventory-button" onClick={this.showStore}>Go Shopping</button>
          </div>
          <AddInventory className="add-inventory"
                        currentInventory={this.state.currentInventory}
                        onSubmit={this.onSubmit}/>
        </div>
      )
    }
  },

  //displays the Cart
  renderCart: function() {
    if (this.state.displayPage.showCart) {
      return (
        <div>
          <Cart cartContents={this.state.cartContents}
                setItemQuantity={this.setItemQuantity}
                backToStore={this.showStore}/>
        </div>
      )
    }
  },

  //passed as a prop to AddInventory
  //adds an item to currentInventory state.
  onSubmit: function(inventory) {
    const currentInventory = this.state.currentInventory.concat({description: inventory.description, price: inventory.price, quantity: 0});
    this.setState({currentInventory});
  },

  //adds an new item from the Store to the cartContents state.
  addToCart: function(item) {
    const cartContents = this.state.cartContents.concat(item);
    this.setState({cartContents});
  },

  //helper function to find the index of a cart item to be modified
  findItemIndex: function(item, collection) {
    return collection.findIndex(function(i) { return item.description == i.description });
  },

  //helper function to update the quantity of a particular item in the a state collection of items
  updateItem: function(item, collection) {
    const index = this.findItemIndex(item, collection);
    const updatedItem = update(collection[index], {quantity: {$set: item.quantity}});
    return update(collection, { $splice: [[index, 1, updatedItem]] });
  },

  //updates the quantity of a particular item in the cartContents state
  updateInventory: function(item) {
    const currentInventory = this.updateItem(item, this.state.currentInventory);
    this.setState({currentInventory});
  },

  //updates the quantity of a particular item in the cartContents state
  updateCartItem: function(item){
    const cartContents = this.updateItem(item, this.state.cartContents);
    this.setState({cartContents});
  },

  //removes an item from cartContents state
  removeFromCart: function(item) {
    const index = this.findItemIndex(item, this.state.cartContents);
    const cartContents = update(this.state.cartContents, { $splice: [[index, 1]] });
    this.setState({cartContents});
    this.updateInventory(item); //updates currentInventory state to show it is not in the cart
  },

  //passed as a prop to Cart and Store
  //Sets an item's quantity in cartContents and currentInventory states
  setItemQuantity: function(item) {
    
    if (this.findItemIndex(item, this.state.cartContents) > -1) { //if the item already exists in the cart
      if (item.quantity === 0) { //remove from cartContents if the item quantity has been set to 0/removed from cart
        this.removeFromCart(item);
      } else { //else the quantity will be modified for this item 
        this.updateInventory(item);
        this.updateCartItem(item);
      }
    } else { //else the item will be added to the cart for the first time
      this.addToCart(item);
      this.updateInventory(item);
    } 
  },

  render: function(){
    return (
      <div>
        <h1 className="store-header">Work & Co Store</h1>
        {this.renderStore()}
        {this.renderAddInventory()}
        {this.renderCart()}
      </div>
    )
  }
});

ReactDOM.render((<App/>), document.getElementById('app'));