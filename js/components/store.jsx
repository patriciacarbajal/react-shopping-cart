import React from 'react';
import Item from './item.jsx'

var Store = React.createClass({

  //increase quantity by 1
  increment(itemData) {
    itemData.quantity += 1;
    this.props.setItemQuantity(itemData);
  },

  //decrease quantity by 1
  decrement(itemData) {
   if (itemData.quantity == 0) return;
   itemData.quantity -= 1
   this.props.setItemQuantity(itemData);
  },

  //map through currentInventory prop objects, displaying each item info
  //allow quantity to be modified
  render: function() {
      const that = this;
      const items = this.props.currentInventory.map(function(item, index) {
        return (
        
          <div className='inventory-item' key={index}>
            <Item itemData={item}
                  setItemQuantity={that.props.setItemQuantity}/>
            <div>
              <button onClick={that.decrement.bind(null, item)}> - </button>
                Quantity: {item.quantity}
              <button onClick={that.increment.bind(null, item)}> + </button>
            </div>    
          </div>
        )
      });

      return (
          <div className='inventory-list'>
            {items}
          </div>
      );
  }
});

export default Store;
