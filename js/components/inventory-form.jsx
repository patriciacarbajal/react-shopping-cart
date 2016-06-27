import React from 'react';
import update from 'react-addons-update';

var InventoryForm = React.createClass({

  getInitialState() {
    return {
      item: {
        description: '',
        price: '',
        quantity: 0
      },
      errors: { priceError: '',
                descriptionError: ''
              }
    }
  },

  //clear description error when field is modified
  //modify item description
  onDescriptionChange: function(e) {
    const errors = update(this.state.errors, { descriptionError: { $set: "" } });
    const item = update(this.state.item, { description: { $set: e.target.value } });
    this.setState({item, errors});
  },

  //clear price error if field is modified
  //modify item price
  onPriceChange: function(e) {
    const errors = update(this.state.errors, { priceError: { $set: "" } });
    const item = update(this.state.item, { price: { $set: e.target.value } });
    this.setState({item, errors});
  },

  //check that description is not blank
  validateDescription: function() {
    if (!this.state.item.description) { 
      const errors = update(this.state.errors, { descriptionError: { $set: "Please include a description" } });
      this.setState({errors});
      return false;
    }
    return true;
  },

  //check that price is a dollar amount
  validatePrice: function() {
    const dollarAmount = /^[0-9]+(\.[0-9][0-9])?$/
    if (!this.state.item.price.match(dollarAmount)) { 
      const errors = update(this.state.errors, { priceError: { $set: "Please set a valid price" } });
      this.setState({errors});
      return false;
    }
    return true;
  },

  //update currentInventory through onSubmit prop, clear input fields to allow a new item
  onSubmit: function(e) {
    e.preventDefault();
    if (!this.validateDescription() || !this.validatePrice()) return;
    this.props.onSubmit(this.state.item)
    this.setState({ item: { description: '', price: '' , quantity: 0 }})
  },

  render: function(){
    return (
      <div>
        <form className='inventory-form'>
          <h3>Add an item to your inventory</h3>
          <div className='inventory-input'>
            <span className='inventory-name'>Name: </span><input className="item-description-input" 
                  type="text"
                  placeholder="Item description"
                  value={this.state.item.description}
                  onChange={this.onDescriptionChange}/>
            <div className='error'>{this.state.errors.descriptionError}</div>
          </div>
          <div className='inventory-input'>
            <span className='inventory-dollar'>Price: $</span><input className="item-price-input"
                  type="text"
                  placeholder="Dollar amount (ex: 5.99)"
                  value={this.state.item.price}
                  onChange={this.onPriceChange}/>
            <div className='error'>{this.state.errors.priceError}</div>
          </div>
          <button onClick={this.onSubmit}>Add</button>
        </form>
      </div>
    )
  }
});

export default InventoryForm;