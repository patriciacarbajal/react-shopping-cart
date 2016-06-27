import React from 'react';

var Item = React.createClass({

  //adds the item to the cart for the first time
  addItem: function(itemData) {
    itemData.quantity += 1;
    this.props.setItemQuantity(itemData);
  },

  //displays item description and price for the Store, allows quantity modification
  //Add to Cart button only allows the item to be added to the cart if it doesn't already exist.
  //otherwise, it shows that the item is already in the cart
  render: function() {
    const itemData = this.props.itemData;
    return (
      <div>
        <div>
          <div className='inventory-item-description'>{itemData.description}</div>
          <div className='inventory-item-price'>${itemData.price}</div>
          <button className="add-to-cart-button" onClick={itemData.quantity >= 1 ? function(){return} : this.addItem.bind(null, itemData)}>
            { itemData.quantity ? 'Item in Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    );
  }
});

export default Item;
