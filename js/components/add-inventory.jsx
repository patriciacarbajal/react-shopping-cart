import React from 'react';
import InventoryForm from './inventory-form.jsx'

var AddInventory = React.createClass({

  //if inventory has already been added, map through each and display each item's information.
  displayCurrentInventory: function() {
    if (this.props.currentInventory.length === 0) {
      return <h3>No inventory yet</h3>
    }
    return (
      <div>
        <h3> Your current inventory </h3> 
        <div>
          {this.props.currentInventory.map(function(item, index){
            return <div key={index}>
                    {index + 1}: {item.description} = ${item.price}
                   </div>
          })}
        </div>
      </div>
    )
  },

  //prop passed to InventoryForm to update currentInventory state
  onSubmit: function(item) {
    this.props.onSubmit({description: item.description, price: item.price, quantity: 0})
  },

  render() {
    return (
      <div className='add-inventory-container'>
        <div className='inventory-form-container'>
          <InventoryForm currentInventory={this.props.currentInventory}
                         onSubmit={this.onSubmit}/>
        </div>
        <div className='current-inventory-container'>{this.displayCurrentInventory()}</div>
      </div>
    );
  }
});

export default AddInventory;
